import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { UserSingleton } from './UserSingleton'; // Correct import statement
import * as nodemailer from 'nodemailer';
import { ResetPassDto } from './dto/resetPass-user.dto';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService {
  private transporter: nodemailer.Transporter;
  private userSingleton: UserSingleton; // Add userSingleton property

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,

    private authService: AuthService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'seelaz.info@gmail.com',
        pass: 'avjb zwyp algo dlpy',
      },
    });
    this.userSingleton = UserSingleton.getInstance(); // Initialize userSingleton
  }

  private generateOTP(): string {
    return Math.random().toString(36).slice(-4).toUpperCase();
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = this.generateOTP();
    user.OTP = otp;
    await user.save();

    const mailOptions = {
      from: 'seelaz.info@gmail.com',
      to: email,
      subject: 'Reset Password OTP',
      text: `Your OTP for resetting the password is: ${otp}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async resetPassword(resetPassDto: ResetPassDto): Promise<{ message: string }> {
    const { email, password, OTP } = resetPassDto;
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.OTP !== OTP) {
      throw new NotFoundException('Invalid OTP');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.findOneAndUpdate({ email }, { password: hashedPassword, OTP: null });
    return { message: 'Password reset successfully' };
  }

    async getUserById(): Promise<User> {
      const userId = this.userSingleton.getCurrentUser()?._id; 
    
      if (!userId) {
        throw new Error('Your session expired, Please Login in again');
      }
    
      const user = await this.userModel.findById(userId);
    
      
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }
  

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    await this.isEmailUnique(createUserDto.email);
    await this.sendVerificationEmail(createUserDto.email, this.generateOTP());
    return await user.save();
  }

  private async isEmailUnique(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException('Email must be unique.');
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async login(req: Request, loginDto: LoginDto): Promise<{ user: User, jwtToken: string, refreshToken: string }> {
    const user = await this.findByMail(loginDto.email);
    await this.checkPassword(loginDto.password, user.password);
    this.userSingleton.setCurrentUser(user);

    this.kafkaClient.emit('user.logged.in', JSON.stringify(user));

    const result = {
      user,
      jwtToken: await this.authService.createAccessToken(user._id),
      refreshToken: await this.authService.createRefreshToken(req, user._id),
    };

    return result;
  }


  async updateUserDetails( updateUserDto: UpdateUserDto): Promise<User> {
    const userId = this.userSingleton.getCurrentUser()?._id; // Get user ID from UserSingleton

    if (!userId) {
      throw new Error('Your session sxpired, Please Login in again');
    }

    const user = await this.userModel.findById(userId);


    user.username = updateUserDto.username || user.username; 
    user.email = updateUserDto.email || user.email;
    user.PhoneNumber = updateUserDto.PhoneNumber || user.PhoneNumber;

    await user.save();
    return user;
  }

  async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto) {
    const userId = await this.authService.findRefreshToken(
      refreshAccessTokenDto.refreshToken,
    );
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('Bad request');
    }
    return {
      accessToken: await this.authService.createAccessToken(user._id),
    };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const userId = this.userSingleton.getCurrentUser()?._id;

    if (!userId) {
      throw new Error('Your session sxpired, Please Login in again');
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    await this.checkPassword(changePasswordDto.currentPassword, user.password);
    user.password = changePasswordDto.newPassword;
    return await user.save();
  }

  async checkPassword(password: string, hashPassword: string) {
    const match = await bcrypt.compare(password, hashPassword);
    if (!match) {
      throw new UnauthorizedException('Wrong email or password.');
    }
  }

  async findByMail(email: string) {
    const user = await this.userModel.findOne({ email }, '+password').exec();
    if (!user) {
      throw new UnauthorizedException('Wrong email or password.');
    }
    return user;
  }

  async findById(): Promise<User | null> {
    const userId = this.userSingleton.getCurrentUser()?._id; // Get user ID from UserSingleton

    if (!userId) {
      throw new Error('Your session sxpired, Please Login in again');
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery);
  }

  async deleteOneById(): Promise<User> {
    const userId = this.userSingleton.getCurrentUser()?._id; // Get user ID from UserSingleton

    if (!userId) {
      throw new Error('Your session sxpired, Please Login in again');
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    const deletedUser = await this.userModel.findOneAndDelete({ userId }).exec();
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
  }

  async verifyAccount(email: string, otp: string): Promise<void> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.OTP !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    user.OTP = null;
    user.save();
  }

  private async sendVerificationEmail(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: 'seelaz.info@gmail.com',
      to: email,
      subject: 'Account Verification OTP',
      text: `Your OTP for account verification is: ${otp}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new BadRequestException('Failed to send verification email');
    }
  }

  async getUsers(): Promise<User[]> {
    return this.find({});
  }

  async deleteUserById(): Promise<User> {
    const userId = this.userSingleton.getCurrentUser()?._id; // Get user ID from UserSingleton

    if (!userId) {
      throw new Error('Your session sxpired, Please Login in again');
    }

    const user = await this.userModel.findOneAndDelete({ userId }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updatePassword(oldPassword: string, newPassword: string): Promise<void> {
    const userId = this.userSingleton.getCurrentUser()?._id; // Get user ID from UserSingleton

    if (!userId) {
      throw new Error('Your session sxpired, Please Login in again');
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await this.userModel.findByIdAndUpdate(userId, { password: hashedNewPassword });
  }



  async createGuestUser(): Promise<User> {
    const guestEmail = `guest_${Date.now()}@example.com`;
    const newUser = new this.userModel({
      email: guestEmail,
      password: 'Guest', // No password for guest users
      username: 'Guest',
      role: 'guest',
      
    });
    const user = await newUser.save();

    this.userSingleton.setCurrentUser(user);

    this.kafkaClient.emit('user.logged.in', JSON.stringify(user));

    return user;

  }
  async completeGuestRegistration(createUserDto: CreateUserDto): Promise<User> {
    const userId = this.userSingleton.getCurrentUser()?._id; // Get user ID from UserSingleton

    const user = await this.userModel.findById(userId);
    if (!user || user.role !== 'guest') {
      throw new NotFoundException('Guest user not found');
    }

    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.username = createUserDto.username;
    user.role = 'user';
    user.PhoneNumber = createUserDto.PhoneNumber;
    user.OTP = this.generateOTP();

    await this.isEmailUnique(createUserDto.email);
    await this.sendVerificationEmail(createUserDto.email, user.OTP);

    const updatedUser = await user.save();

    this.userSingleton.setCurrentUser(updatedUser);

    return updatedUser;
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
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
import { GlobalService } from './global.service'; // Import the GlobalService

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
    private readonly globalService: GlobalService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    await this.isEmailUnique(createUserDto.email);
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

  async login(req: Request, loginDto: LoginDto) {
    const user = await this.findByMail(loginDto.email);
    await this.checkPassword(loginDto.password, user.password);
    console.log("aho", req.body);
    console.log("ahooo", user);

    this.globalService.setGlobalUser(user); // Store the user globally using GlobalService

    return {
      user,
      jwtToken: await this.authService.createAccessToken(user._id),
      refreshToken: await this.authService.createRefreshToken(req, user._id),
    };
  } 
  
  async updateUser(updateUserDto: UpdateUserDto) {
    const userId = this.globalService.getGlobalUser()?._id;

    if (!userId) {
      throw new Error('User ID not found globally');
    }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.name = updateUserDto.name; // Update user's name from DTO

    await user.save();

    return user;
  }






  //async updateUser(jwtPayload: JwtPayload, updateUserDto: any): Promise<any> {
  //   const userId = jwtPayload.userId;
  //   const user = await this.userModel.findById(userId);
  //   if (!user) {
  //     throw new UnauthorizedException('User not found.');
  //   }
  //   Object.assign(user, updateUserDto);
  //   await user.save();
  //   return user;
  // }



  // async update(user: User, updateUserDto: UpdateUserDto) {
  //   user.name = updateUserDto.name;
  //   return await user.save();
  // }


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

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
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
}

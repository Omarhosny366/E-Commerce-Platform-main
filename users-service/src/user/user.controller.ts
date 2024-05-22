import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { UpdatePasswordDto } from './dto/update-pass.dto';
import { ResetPassDto } from './dto/resetPass-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('guest')
  async createGuestUser() {
    return await this.userService.createGuestUser();
  }

  @Post('guest/complete')
  async completeGuestRegistration(
    @Body() createUserDto: CreateUserDto
  ) {
    return await this.userService.completeGuestRegistration(createUserDto);
  }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async list() {
    return await this.userService.findAll();
  }

  @Put('update')
  @UseInterceptors(FileInterceptor('file')) // This captures the file from the form data
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userService.updateUserDetails(updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() loginDto: LoginDto) {
    try {
      return await this.userService.login(req, loginDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('token/refresh')
  @HttpCode(HttpStatus.CREATED)
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ) {
    try {
      return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('password')
   @HttpCode(HttpStatus.OK)
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    try {
      return await this.userService.changePassword(changePasswordDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('send-reset-password-email')
  @HttpCode(HttpStatus.OK)
  async sendResetPasswordEmail(@Body('email') email: string) {
    try {
      await this.userService.sendResetPasswordEmail(email);
      return { message: 'Reset password email sent successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPassDto: ResetPassDto) {
    try {
      return await this.userService.resetPassword(resetPassDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verify-account')
  @HttpCode(HttpStatus.OK)
  async verifyAccount(@Body() verifyAccountDto: VerifyAccountDto) {
    try {
      await this.userService.verifyAccount(verifyAccountDto.email, verifyAccountDto.otp);
      return { message: 'Account verified successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update-password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    try {
      return await this.userService.updatePassword(updatePasswordDto.oldPassword, updatePasswordDto.newPassword);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
   @HttpCode(HttpStatus.OK)
  async deleteUser(@Req() req) {
    try {
      return await this.userService.deleteUserById();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
@Get('profile')
@HttpCode(HttpStatus.OK)
async getProfile(@Req() req) {
  try {
    return await this.userService.getUserById();
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}

}

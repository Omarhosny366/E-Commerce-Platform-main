import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { RefreshToken } from './schemas/refresh-token.schema';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { v4 } from 'uuid';
import { getClientIp } from 'request-ip';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('RefreshToken')
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccessToken(userId: string) {
    return await this.jwtService.signAsync({ userId });
  }

  async createRefreshToken(req: Request, userId: string) {
    const refreshToken = new this.refreshTokenModel({
      userId,
      refreshToken: v4(),
      ip: this.getIp(req),
      browser: this.getBrowserInfo(req),
    });
    await refreshToken.save();
    return refreshToken.refreshToken;
  }

  async findRefreshToken(token: string) {
    const refreshToken = await this.refreshTokenModel.findOne({
      refreshToken: token,
    });
    if (!refreshToken) {
      throw new UnauthorizedException('User has been logged out.');
    }
    return refreshToken.userId;
  }

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userModel.findOne(
      { _id: jwtPayload.userId },
      '+password',
    );
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  getIp(req: Request): string {
    return getClientIp(req);
  }

  getBrowserInfo(req: Request): string {
    return req.header('user-agent') || 'XX';
  }

  private static jwtExtractor(request) {
    let token = null;
    if (request.headers['x-token']) {
      token = request.headers['x-token'];
    } else if (request.headers.authorization) {
      const authHeader = request.headers.authorization;
      token = authHeader.split(' ')[1];
    } else if (request.body.token) {
      token = request.body.token;
    } else if (request.query.token) {
      token = request.query.token;
    }
    return token;
  }

  returnJwtExtractor() {
    return AuthService.jwtExtractor;
  }
}

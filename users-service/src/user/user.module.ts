import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserSingleton } from './UserSingleton';
// import { AddressModule } from 'src/Address/address.module';
import { AuthService } from 'src/auth/auth.service';
// import { WishlistModule } from 'src/Wishlist/wishlist.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    AuthModule,/*AddressModule*//*WishlistModule*/
  ],
  providers: [UserService],
  controllers: [UserController],
  
})
export class UserModule {}

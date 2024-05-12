import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schemas/address.schema';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserSingleton } from 'src/user/UserSingleton';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema },{ name: User.name, schema: UserSchema }])
  ,AuthModule
],
  controllers: [AddressController],
  providers: [UserService,AddressService,{
    provide: 'UserSingleton', // Provide a token for UserSingleton
    useFactory: () => {
      const userSingleton = UserSingleton.getInstance();
      return userSingleton;
    },
  },],
})
export class AddressModule {}

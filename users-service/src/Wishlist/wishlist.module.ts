import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wishlist, WishlistSchema } from './schemas/wishlist.schema';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserSingleton } from 'src/user/UserSingleton';
import { UserService } from 'src/user/user.service';
import { AddressService } from 'src/Address/address.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
    ]),
    MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistSchema },{ name: User.name, schema: UserSchema }])

],
  providers: [WishlistService,{
    provide: 'UserSingleton', // Provide a token for UserSingleton
    useFactory: () => {
      const userSingleton = UserSingleton.getInstance();
      return userSingleton;
    },
  }
],
  controllers: [WishlistController],
})
export class WishlistModule {}

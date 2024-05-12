import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './Address/address.module';
import { WishlistModule } from './Wishlist/wishlist.module';
import { UserSingleton } from './user/UserSingleton'; // Correct import statement

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    AuthModule,
    AddressModule,
    WishlistModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'UserSingleton', // Provide a token for UserSingleton
    useFactory: () => {
      const userSingleton = UserSingleton.getInstance();
      return userSingleton;
    },
  },
   ],
})
export class AppModule {}

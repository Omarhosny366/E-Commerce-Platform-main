import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Cart ,CartSchema } from './cart/schemas/cart.schema';
import { UserSingleton } from './cart/userSingleton';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
   
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'UserSingleton', // Provide a token for UserSingletonز
    useFactory: () => {
      const userSingleton = UserSingleton.getInstance();
      return userSingleton;
    },
  },],
})
export class AppModule {}

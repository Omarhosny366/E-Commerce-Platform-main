import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { UserSingleton } from './cart/userSingleton';
import { Cart, CartSchema } from './cart/schemas/cart.schema';
import { Order, OrderSchema } from './order/schema/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    CartModule,
    OrderModule, 
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'UserSingleton', 
      useFactory: () => {
        const userSingleton = UserSingleton.getInstance();
        return userSingleton;
      },
    },
  ],
})
export class AppModule {}

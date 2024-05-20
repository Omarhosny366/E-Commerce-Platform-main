import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './schemas/cart.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'cart-consumer',
          },
        },
      },
    ]),
    OrderModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService], // Export CartService if it is used in other modules
})
export class CartModule {}

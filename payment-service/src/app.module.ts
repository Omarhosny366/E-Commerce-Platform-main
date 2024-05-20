import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './payment/schemas/payment.model';
import { OrderRepository } from './payment/payment.repository';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://omarhosny120:omarINsee@seelaz-cluster.oh8ciqb.mongodb.net'),
    PaymentModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [OrderRepository],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustPurchaseProductController } from './cust-purchase-product.controller';
import { CustPurchaseProductService } from './cust-purchase-product.service';
import { CustPurchaseProduct, CustPurchaseProductSchema } from './schemas/cust-purchase-product.schema';
import { CustPurchaseProductRepository } from './cust-purchase-product.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [MongooseModule.forFeature([{ name: CustPurchaseProduct.name, schema: CustPurchaseProductSchema }]),
  ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'product-consumer',
        },
      },
    },
  ]),
],
  controllers: [CustPurchaseProductController],
  providers: [CustPurchaseProductService, CustPurchaseProductRepository],
})
export class CustPurchaseProductModule {}

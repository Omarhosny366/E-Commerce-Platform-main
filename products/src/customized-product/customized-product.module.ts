import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomizedProductController } from './customized-product.controller';
import { CustomizedProductService } from './customized-product.service';
import { CustomizedProduct, CustomizedProductSchema } from './schemas/customized-product.schema';
import { CustomizedProductRepository } from './customized-product.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [MongooseModule.forFeature([{ name: CustomizedProduct.name, schema: CustomizedProductSchema }]),
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
  ]),],
  controllers: [CustomizedProductController],
  providers: [CustomizedProductService, CustomizedProductRepository],
})
export class CustomizedProductModule {}

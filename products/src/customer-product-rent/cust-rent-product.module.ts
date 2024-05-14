import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustRentProductController } from './cust-rent-product.controller';
import { CustRentProductService } from './cust-rent-product.service';
import { CustRentProduct, CustRentProductSchema } from './schemas/cust-rent-product.schema';
import { CustRentProductRepository } from './cust-rent-product.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: CustRentProduct.name, schema: CustRentProductSchema }])],
  controllers: [CustRentProductController],
  providers: [CustRentProductService, CustRentProductRepository],
})
export class CustRentProductModule {}

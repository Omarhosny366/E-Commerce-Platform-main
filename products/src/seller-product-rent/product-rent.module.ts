import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerRentProductController } from './product-rent.controller';
import { SellerRentProductService } from './product-rent.service';
import { SellerRentProduct, SellerRentProductSchema } from './schemas/product.schema';
import { SellerProductRentRepository } from './product-rent.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: SellerRentProduct.name, schema: SellerRentProductSchema }])],
  controllers: [SellerRentProductController],
  providers: [SellerRentProductService, SellerProductRentRepository],
})
export class SellerRentProductModule {}

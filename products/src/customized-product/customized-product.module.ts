import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomizedProductController } from './customized-product.controller';
import { CustomizedProductService } from './customized-product.service';
import { CustomizedProduct, CustomizedProductSchema } from './schemas/customized-product.schema';
import { CustomizedProductRepository } from './customized-product.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: CustomizedProduct.name, schema: CustomizedProductSchema }])],
  controllers: [CustomizedProductController],
  providers: [CustomizedProductService, CustomizedProductRepository],
})
export class CustomizedProductModule {}

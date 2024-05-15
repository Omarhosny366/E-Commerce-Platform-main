import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustPurchaseProductController } from './cust-purchase-product.controller';
import { CustPurchaseProductService } from './cust-purchase-product.service';
import { CustPurchaseProduct, CustPurchaseProductSchema } from './schemas/cust-purchase-product.schema';
import { CustPurchaseProductRepository } from './cust-purchase-product.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: CustPurchaseProduct.name, schema: CustPurchaseProductSchema }])],
  controllers: [CustPurchaseProductController],
  providers: [CustPurchaseProductService, CustPurchaseProductRepository],
})
export class CustPurchaseProductModule {}

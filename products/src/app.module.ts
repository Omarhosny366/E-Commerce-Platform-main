import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerRentProductModule } from './seller-product-rent/product-rent.module';
import { CustRentProductModule } from './customer-product-rent/cust-rent-product.module';
import { CustPurchaseProductModule } from './customer-product-purchase/cust-purchase-products.module';
import { CustomizedProductModule } from './customized-product/customized-product.module';
import { UserSingleton } from './customized-product/userSingleton';
import { ConfigModule } from '@nestjs/config';
import { CustomizedProductSchema, CustomizedProduct } from './customized-product/schemas/customized-product.schema';
import { CustRentProductSchema, CustRentProduct } from './customer-product-rent/schemas/cust-rent-product.schema';
import { CustPurchaseProductSchema, CustPurchaseProduct } from './customer-product-purchase/schemas/cust-purchase-product.schema';

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Debug statement

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    SellerRentProductModule,
    CustRentProductModule,
    CustPurchaseProductModule,
    CustomizedProductModule,
    MongooseModule.forFeature([
      { name: CustomizedProduct.name, schema: CustomizedProductSchema },
      { name: CustPurchaseProduct.name, schema: CustPurchaseProductSchema },
      { name: CustRentProduct.name, schema: CustRentProductSchema },
    ]),
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

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerRentProductModule } from './seller-product-rent/product-rent.module';
import { CustRentProductModule } from './customer-product-rent/cust-rent-product.module'; // Import the module

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://omarhosny120:omarINsee@seelaz-cluster.oh8ciqb.mongodb.net'), // Adjust the MongoDB connection string as needed
    SellerRentProductModule,
    CustRentProductModule, // Add the module here
    ClientsModule.register([
      {
        name: 'test',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8877,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

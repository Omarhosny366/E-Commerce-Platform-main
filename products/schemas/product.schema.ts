import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SellerRentProduct } from 'src/seller-product-rent/schemas/product.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

    @Prop()
    name: string;

    @Prop()
    quantity: number;

    @Prop()
    productImage: string;

    @Prop()
    productRating: number;
}
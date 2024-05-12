import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import e from 'express';
import {Document} from 'mongoose';
import {Product} from 'src/schemas/product.schema';

export type SellerRentProductDocument = SellerRentProduct & Document;

@Schema()
export class SellerRentProduct extends Product {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    quantity: number;

    @Prop()
    price: number;

    @Prop()
    downpayment: number;

    @Prop()
    productImage: string;

    @Prop()
    productRating: number;

}

export const SellerRentProductSchema = SchemaFactory.createForClass(SellerRentProduct);
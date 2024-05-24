import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustPurchaseProductDocument = CustPurchaseProduct & Document;

@Schema()
export class CustPurchaseProduct {
    @Prop()
    name : string;
    
    @Prop()
    type: string;

    @Prop()
    dimensions: string;

    @Prop()
    color: string;

    @Prop()
    material: string;

    @Prop()
    price: number;

    @Prop()
    quantity: number;

    @Prop()
    review: number;
}

export const CustPurchaseProductSchema = SchemaFactory.createForClass(CustPurchaseProduct);
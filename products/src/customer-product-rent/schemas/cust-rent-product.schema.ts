import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustRentProductDocument = CustRentProduct & Document;

@Schema()
export class CustRentProduct {
    @Prop()
    name: string;
    
    @Prop()
    type: string;

    @Prop()
    dimensions: string;

    @Prop()
    color: string;

    @Prop()
    material: string;

    @Prop({ required: true, type: Number }) 
    price: number;

    @Prop()
    quantity: number;

    @Prop()
    start_date: Date;

    @Prop()
    duration: number;

    @Prop()
    end_date: Date;

    @Prop()
    review: number;
}

export const CustRentProductSchema = SchemaFactory.createForClass(CustRentProduct);

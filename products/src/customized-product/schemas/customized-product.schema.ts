import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomizedProductDocument = CustomizedProduct & Document;

@Schema()
export class CustomizedProduct {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    dimensions: string;

    @Prop({ required: true })
    color: string;

    @Prop({ required: true })
    material: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    downPayment: number;

    @Prop({ required: true })
    customizing_status: string;

    // @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    // seller_user_id: Types.ObjectId;

    @Prop()
    review: number;
}

export const CustomizedProductSchema = SchemaFactory.createForClass(CustomizedProduct);

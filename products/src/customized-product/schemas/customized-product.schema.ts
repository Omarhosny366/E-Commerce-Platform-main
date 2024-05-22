import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomizedProductDocument = CustomizedProduct & Document;

@Schema()
export class CustomizedProduct {
    @Prop({ required: true, default: 'customized' })
    type: string; 
    
  @Prop({ required: false })
  dimensions?: string;

  @Prop({ required: false })
  color?: string;

  @Prop({ required: false })
  material?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  downPayment: number;

  @Prop({ required: true })
  customizing_status: string;

 

  @Prop({ required: true })
  review: number;
}

export const CustomizedProductSchema = SchemaFactory.createForClass(CustomizedProduct);

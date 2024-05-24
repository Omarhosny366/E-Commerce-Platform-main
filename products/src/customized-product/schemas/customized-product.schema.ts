import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomizedProductDocument = CustomizedProduct & Document;

@Schema()
export class CustomizedProduct {
    @Prop({ required: true, default: 'customized' })
    type: string; 

    
  @Prop({ required: true ,default: 'customized Product' })
  name: string;

  @Prop({ required: false })
  dimensions?: string;

  @Prop({ required: false })
  color?: string;

  @Prop({ required: false })
  material?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  quantity: number;

  @Prop({ required: false })
  downPayment: number;

  @Prop({ required: true ,default:"Preparing" })
  customizing_status: string;

 

  @Prop({ required: false })
  review: number;
}

export const CustomizedProductSchema = SchemaFactory.createForClass(CustomizedProduct);

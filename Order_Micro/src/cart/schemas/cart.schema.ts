import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  product_ids: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  userId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

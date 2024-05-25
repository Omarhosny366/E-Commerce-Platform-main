import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: [{
      product_id: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
      type: { type: String, required: false },
      material: { type: Object, required: false },
      dimensions: { type: Object, required: false },
      name: { type: String, required: false },

    }],
    default: []
  })
  items: { product_id: Types.ObjectId; quantity: number; price: number; type: string; material: Object; dimensions: Object, downPayment:number,name:string }[];

  @Prop({ type: Number, default: 0 })
  totalPrice: number;

  @Prop({ type: Number, default: 0, required: false })
  downpayment: number;

  @Prop({ type: Date, required: false })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

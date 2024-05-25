import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    type: [{
      product_id: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
      type: { type: String, required: false },
      material: { type: Object, required: false },
      dimensions: { type: Object, required: false }
    }],
    default: []
  })
  items: { product_id: Types.ObjectId; quantity: number; price: number; type: string; startDate: Date; endDate: Date; material: Object; dimensions: Object }[];

  @Prop({ type: Types.Map, required: true })
  address: Map<string, any>;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: String, default: 'Placed' })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Number, required: false })
  downpayment: number;

  @Prop({ type: Date, required: false })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

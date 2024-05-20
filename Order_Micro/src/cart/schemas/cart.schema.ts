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
       type:{ type: String, required: true },
       material:{type: Object, required:false},
       dimensions:{type: Object, required:false}


    }],
    default: []
  })
  items: { product_id: Types.ObjectId; quantity: number; price: number, type:string , material:Object, dimensions:Object/*,color:string,material:string */ }[];
  
  @Prop({ type: Number, default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

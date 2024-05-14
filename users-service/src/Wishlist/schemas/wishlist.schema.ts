import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type WishlistDocument = Wishlist & Document;


@Schema()
export class Wishlist {
    @Prop()
    ProductID: string[];

    @Prop()
    User_id: string;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Item {
    @Prop()
    name: string;

    @Prop()
    amount_cents: string;

    @Prop()
    description: string;

    @Prop()
    quantity: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

@Schema()
export class ShippingData {
    @Prop()
    apartment: string;

    @Prop()
    email: string;

    @Prop()
    floor: string;

    @Prop()
    first_name: string;

    @Prop()
    street: string;

    @Prop()
    building: string;

    @Prop()
    phone_number: string;

    @Prop()
    postal_code: string;

    @Prop()
    extra_description: string;

    @Prop()
    city: string;

    @Prop()
    country: string;

    @Prop()
    last_name: string;

    @Prop()
    state: string;
}

export const ShippingDataSchema = SchemaFactory.createForClass(ShippingData);

@Schema()
export class ShippingDetails {
    @Prop()
    notes: string;

    @Prop()
    number_of_packages: number;

    @Prop()
    weight: number;

    @Prop()
    weight_unit: string;

    @Prop()
    length: number;

    @Prop()
    width: number;

    @Prop()
    height: number;

    @Prop()
    contents: string;
}

export const ShippingDetailsSchema = SchemaFactory.createForClass(ShippingDetails);

@Schema()
export class Order {
    @Prop()
    auth_token: string;

    @Prop()
    delivery_needed: string;

    @Prop()
    amount_cents: string;

    @Prop()
    currency: string;

    @Prop()
    merchant_order_id: number;

    @Prop({ type: [ItemSchema] })
    items: Item[];

    @Prop()
    shipping_data: ShippingData;

    @Prop()
    shipping_details: ShippingDetails;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

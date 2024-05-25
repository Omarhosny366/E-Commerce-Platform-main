import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    buildingNumber: string;

    @Prop({ required: true })
    floor: string;

    @Prop({ required: true })
    flatNumber: string;

    @Prop({ required: true })
    buildingType: string;

    @Prop()
    User_id: string; 
}

export const AddressSchema = SchemaFactory.createForClass(Address);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
export type AddressDocument = Address & Document;

@Schema()
export class Address {
    @Prop()
    city: string;

    @Prop()
    street: string;

    @Prop()
    buildingNumber: string;

    @Prop()
    floor: string;

    @Prop()
    flatNumber: string;

    @Prop()
    buildingType: string; 
    
    
    @Prop()
    User_id: string; 
}

export const AddressSchema = SchemaFactory.createForClass(Address);

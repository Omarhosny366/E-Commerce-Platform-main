import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
  },
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  role: string;

  @Prop()
  PhoneNumber: string;

  @Prop()
  OTP: string;

  @Prop()
  address_Id: string[];

  @Prop()
  paymentCard_ID: string[];

  @Prop()
  profileImage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.get('password'), 10);
    this.set('password', hashedPassword);
    next();
  } catch (err) {
    next(err);
  }
});

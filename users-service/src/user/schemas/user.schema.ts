import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  try {
    if (!this.isSelected('password') || !this.isModified('password')) {
      return;
    }
    // tslint:disable-next-line:no-string-literal
    this['password'] = await bcrypt.hash(this['password'], 10);
  } catch (err) {
    throw err;
  }
});

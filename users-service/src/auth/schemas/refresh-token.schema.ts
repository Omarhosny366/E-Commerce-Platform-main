import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class RefreshToken extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;

  @Prop({ required: true })
  refreshToken: string;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  browser: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

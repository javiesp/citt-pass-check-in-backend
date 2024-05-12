import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CheckInDocument = CheckIn & Document;

@Schema()
export class CheckIn {
  @Prop()
  uid_user: string;

  @Prop()
  entry_date: Date;

  @Prop()
  entry_reason: string;

  @Prop()
  times_entered: number;
}

export const CheckInSchema = SchemaFactory.createForClass(CheckIn);
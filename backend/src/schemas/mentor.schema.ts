import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type UserDocument = HydratedDocument<Mentor>;

@Schema()
export class Mentor {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  years_of_experience: string;

  @Prop()
  availability: string;

  @Prop([String])
  expertise: string[];
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);

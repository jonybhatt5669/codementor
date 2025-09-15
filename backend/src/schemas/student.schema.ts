import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type UserDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  studentId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  grade_level: string;

  @Prop()
  major: string;

  @Prop([String])
  interests: string[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);

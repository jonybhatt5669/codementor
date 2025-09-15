import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  STUDENT = 'STUDENT',
  MENTOR = 'Mentor',
  ADMIN = 'Admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  bio?: string;

  @Prop()
  avatar?: string;

  @Prop({ default: UserRole.STUDENT })
  role: UserRole;

  @Prop()
  password: string;

  @Prop({ default: false })
  onboard: boolean;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

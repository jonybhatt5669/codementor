import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private users: Model<UserDocument>) {}

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.users
      .findOne({
        email: email,
      })
      .exec();
  }

  async create(dto: Partial<User>) {
    const user = await this.users.create(dto);

    await user.save();
  }

  async refreshToken(userId: string, refreshToken: string) {
    const hashToken = await bcrypt.hash(refreshToken, 10);

    await this.users.findByIdAndUpdate(userId, { refreshToken: hashToken });
  }
}

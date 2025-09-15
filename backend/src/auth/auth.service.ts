import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './AuthDto/SignUpDto';
import { UserDocument } from '../schemas/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, password: string) {
    try {
      const user: UserDocument | null =
        await this.userService.findUserByEmail(email);

      if (!user) {
        return new UnauthorizedException('Email is incorrect');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return new UnauthorizedException('Password is incorrect');
      }

      const payload = { sub: user._id, userEmail: user.email };

      const access_token = this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: this.configService.get('jwt_secret') || 'jwtmentorcode',
      });
      const refresh_token = this.jwtService.sign(payload, {
        secret:
          this.configService.get('jwt_refresh_secret') || 'superRefreshSecret',
        expiresIn: '7d',
      });

      await this.userService.refreshToken(user._id.toString(), refresh_token);
      return { access_token: access_token, refresh_token: refresh_token };
    } catch (e) {
      throw new InternalServerErrorException(`Something went wrong: ${e}`);
    }
  }

  async signUp(dto: SignUpDto) {
    const existingUser = await this.userService.findUserByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.userService.create({
      ...dto,
      password: hashedPassword,
    });
  }

  async refreshTokens(email: string, refreshToken: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const payload = { sub: user._id, email: user.email };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt_secret') || 'superSecretKey',
      expiresIn: '15m',
    });

    return { access_token };
  }

  async passwordResetRequest(email: string) {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        return new UnauthorizedException('No email found!');
      }

      // send email to user email

    } catch (e) {
      console.log('PasswordRequestError: ', e);
    }
  }
}

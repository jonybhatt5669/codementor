import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './AuthDto/SignInDto';
import { SignUpDto } from './AuthDto/SignUpDto';
import { AuthGuard, Public } from './auth.guard';
import { RefreshTopkenDto } from './AuthDto/RefreshTopkenDto';
import { APP_GUARD } from '@nestjs/core';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    console.log('Email: ', signInDto.email);

    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('refresh-token')
  @HttpCode(HttpStatus.CREATED)
  refresh(@Body() dto: RefreshTopkenDto) {
    return this.authService.refreshTokens(dto.email, dto.refreshToken);
  }
}

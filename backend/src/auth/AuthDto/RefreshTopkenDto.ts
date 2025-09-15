import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTopkenDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  refreshToken: string;
}

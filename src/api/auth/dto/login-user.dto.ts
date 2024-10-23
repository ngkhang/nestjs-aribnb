import { IsEmail, IsString, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  password: string;
}

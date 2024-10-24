import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @Expose()
  email: string;

  @IsString()
  @Expose()
  password: string;
}

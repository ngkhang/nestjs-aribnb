import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseUserDto {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  password: string;

  @IsString()
  @MaxLength(255)
  fullName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsOptional()
  @IsString()
  status: string;
}

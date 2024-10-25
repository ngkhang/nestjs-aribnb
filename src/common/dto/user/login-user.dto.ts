import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(125)
  @Expose()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  @Expose()
  password: string;
}

import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class BaseUserDto extends LoginUserDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Expose()
  fullName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Expose()
  username: string;

  @IsOptional()
  @IsString()
  @Expose()
  status: string;
}

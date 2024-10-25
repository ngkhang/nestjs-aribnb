import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
  @ApiHideProperty()
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(125)
  @Expose()
  fullName: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Expose()
  username: string;

  @ApiProperty({ required: false, default: 'active' })
  @IsOptional()
  @IsString()
  @Expose()
  status: string;
}

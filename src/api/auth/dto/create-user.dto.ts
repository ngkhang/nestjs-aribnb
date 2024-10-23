import { IsString } from 'class-validator';
import { BaseUserDto } from 'src/common/dto/user/base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @IsString()
  password: string;

  constructor(partial: Partial<CreateUserDto>) {
    super();
    Object.assign(this, partial);
  }
}

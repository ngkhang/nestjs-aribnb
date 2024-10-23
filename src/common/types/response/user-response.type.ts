import { Exclude, Expose } from 'class-transformer';
import { BaseUserDto } from 'src/common/dto/user/base-user.dto';

export class UserResponseDto {
  id: number;
  email: string;
  password: string;
  username: string;
  status: string;

  @Expose({ name: 'fullName' })
  full_name: string;

  @Expose({ name: 'registeredAt' })
  registered_at: Date;

  @Expose({ name: 'updatedAt' })
  updated_at: Date;

  @Exclude()
  refresh_token: string;

  constructor(partial: Partial<BaseUserDto>) {
    Object.assign(this, partial);
  }
}

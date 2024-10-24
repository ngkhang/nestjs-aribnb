import { Exclude, Expose } from 'class-transformer';
import { BaseUserDto } from 'src/common/dto/user/base-user.dto';

export class UserResponseDto extends BaseUserDto {
  @Expose({ name: 'full_name' })
  fullName: string;

  @Exclude()
  refreshToken?: string;

  @Expose({ name: 'registered_at' })
  registeredAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt?: Date;
}

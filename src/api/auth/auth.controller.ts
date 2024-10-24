import { Body, Controller, Post } from '@nestjs/common';
import { TransformResponse } from 'src/common/decorators/transform-response.decorator';
import { IResponse } from 'src/common/types/response/response.type';
import { UserResponseDto } from 'src/common/types/response/user-response.type';
import { UserPrisma } from 'src/common/types/user/user.type';
import { LoginUserDto } from '../../common/dto/user/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @TransformResponse(UserResponseDto)
  async login(
    @Body() userLogin: LoginUserDto
  ): Promise<IResponse<UserPrisma, { token: string }>> {
    return this.authService.login(userLogin);
  }

  @Post('sign-up')
  @TransformResponse(UserResponseDto)
  async signUp(
    @Body() userSignUp: CreateUserDto
  ): Promise<IResponse<UserPrisma>> {
    return this.authService.signUp(userSignUp);
  }
}

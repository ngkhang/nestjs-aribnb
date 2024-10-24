import { Body, Controller, Post } from '@nestjs/common';
import { ResponseType } from 'src/common/types/response/response.type';
import { UserResponseDto } from 'src/common/types/response/user-response.type';
import { LoginUserDto } from '../../common/dto/user/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userLogin: LoginUserDto
  ): Promise<ResponseType<{ user: UserResponseDto; token: string }>> {
    return this.authService.login(userLogin);
  }

  @Post('sign-up')
  async signUp(
    @Body() userSignUp: CreateUserDto
  ): Promise<ResponseType<UserResponseDto>> {
    return this.authService.signUp(userSignUp);
  }
}

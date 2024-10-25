import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TransformResponse } from 'src/common/decorators/transform-response.decorator';
import { IResponse } from 'src/common/types/response/response.type';
import { UserResponseDto } from 'src/common/types/response/user-response.type';
import { UserPrisma } from 'src/common/types/user/user.type';
import { LoginUserDto } from '../../common/dto/user/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
  })
  @ApiBody({
    description: 'Login',
    type: LoginUserDto,
    examples: {
      user: {
        value: {
          email: 'khang@gmail.com',
          password: '1234',
        } as LoginUserDto,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Request',
    example: {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Email is not correct',
      error: 'Unauthorized',
    },
  })
  @ApiOkResponse({
    description: 'Login successful',
    example: {
      statusCode: HttpStatus.OK,
      content: {
        user: {
          id: 2,
          fullName: 'Nguyen Khang',
          username: 'ngkhang',
          status: 'active',
          email: 'khang@gmail.com',
          password: '1234',
          registeredAt: '2024-10-22T15:02:11.000Z',
          updatedAt: '2024-10-24T16:10:06.000Z',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibmdraGFuZyIsImtleSI6MTcyOTgyMjcwMzkyNSwiaWF0IjoxNzI5ODIyNzAzLCJleHAiOjE3Mjk5MDkxMDN9.ZViCgvtnQLy09T3CZQAyxVhpfHGKs2yKm2Yq4a9dv8M',
      },
      message: 'Login successful',
      dateTime: '2024-10-25T02:18:23.948Z',
    },
  })
  @TransformResponse(UserResponseDto)
  async login(
    @Body() userLogin: LoginUserDto
  ): Promise<IResponse<UserPrisma, { token: string }>> {
    return this.authService.login(userLogin);
  }

  @Post('sign-up')
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiBody({
    description: 'Sign up',
    type: CreateUserDto,
    examples: {
      user: {
        value: {
          email: 'khang@gmail.com',
          password: '1234',
          fullName: '',
          username: '',
          status: 'active',
        } as CreateUserDto,
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Create successful',
    example: {
      statusCode: HttpStatus.CREATED,
      content: {
        user: {
          id: 26,
          fullName: 'User 25',
          username: 'user25',
          status: 'active',
          email: 'user25@gmail.com',
          password: '1254',
          registeredAt: '2024-10-25T07:35:43.000Z',
          updatedAt: '2024-10-25T07:35:43.000Z',
        },
      },
      message: 'Create a new account successful',
      dateTime: '2024-10-25T07:35:43.112Z',
    },
  })
  @TransformResponse(UserResponseDto)
  async signUp(
    @Body() userSignUp: CreateUserDto
  ): Promise<IResponse<UserPrisma>> {
    return this.authService.signUp(userSignUp);
  }
}

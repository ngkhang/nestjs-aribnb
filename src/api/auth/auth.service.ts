import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IResponse } from 'src/common/types/response/response.type';
import { UserPrisma } from 'src/common/types/user/user.type';
import { ConfigService } from 'src/shared/config/config.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { passwordService } from 'src/utils/password.util';
import { LoginUserDto } from '../../common/dto/user/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Login
   */
  login = async (
    userLogin: LoginUserDto
  ): Promise<IResponse<UserPrisma, { token: string }>> => {
    // Validate email and password
    const user = await this.verifyUser(userLogin);

    // Create accessToken and refresh token
    const { token, refreshToken } = await this.generateToken(user);

    // Save refresh token into DB
    await this.prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        refresh_token: refreshToken,
      },
    });

    // Response accessToken for client
    return {
      dataTransform: {
        key: 'user',
        value: { ...user, password: userLogin.password },
      },
      rawData: { token },
      message: 'Login successful',
    };
  };

  // SignUp
  signUp = async (
    userSignUp: CreateUserDto
  ): Promise<IResponse<UserPrisma>> => {
    // Check email or username have unique
    const existingAccount = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: userSignUp.email,
            },
          },
          {
            username: {
              equals: userSignUp.username,
            },
          },
        ],
      },
    });
    if (existingAccount) {
      throw new ConflictException(
        `An account with this ${existingAccount.email === userSignUp.email ? 'email' : 'username'} already exists`
      );
    }

    // TODO: Handle only Admin must role=Admin

    const { fullName, password, ...user } = userSignUp;
    // Insert data user's into DB
    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        full_name: fullName,
        password: await passwordService.hashPassword(password),
      },
    });
    return {
      dataTransform: { key: 'user', value: { ...newUser, password } },
      message: 'Create a new account successful',
    };
  };

  /**
   * Generate token and refresh token
   */
  private generateToken = async (user: {
    id: number;
    username: string;
    email: string;
  }) => {
    const {
      AUTH_JWT_SECRET_KEY,
      AUTH_REFRESH_SECRET_KEY,
      AUTH_JWT_TOKEN_EXPIRES_IN,
      AUTH_REFRESH_TOKEN_EXPIRES_IN,
    } = this.configService.authConfig;
    const { id, username } = user;

    const payload = {
      userId: id,
      username,
      key: new Date().getTime(),
    };

    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: AUTH_JWT_SECRET_KEY,
        expiresIn: AUTH_JWT_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: AUTH_REFRESH_SECRET_KEY,
        expiresIn: AUTH_REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);

    return {
      token,
      refreshToken,
    };
  };

  // FIXME: Return Boolean
  /**
   * Verify email and password user's
   */
  private verifyUser = async (userLogin: LoginUserDto): Promise<UserPrisma> => {
    // Verify email
    const user = await this.prisma.user.findUnique({
      where: { email: userLogin.email },
    });

    if (!user) throw new UnauthorizedException('Email is not correct');

    // Check password
    if (!passwordService.comparePassword(userLogin.password, user.password))
      throw new UnauthorizedException('Password is not correct');
    return user;
  };
}

import { Module } from '@nestjs/common';
import { JwtService, JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { AUTH_JWT_SECRET_KEY, AUTH_JWT_TOKEN_EXPIRES_IN } =
          configService.authConfig;

        return {
          global: true,
          secret: AUTH_JWT_SECRET_KEY,
          signOptions: {
            expiresIn: AUTH_JWT_TOKEN_EXPIRES_IN,
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [],
  providers: [JwtStrategy, JwtService],
  exports: [NestJwtModule, JwtStrategy, JwtService],
})
export class JwtModule {}

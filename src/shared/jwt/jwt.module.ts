import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { jwtConfig } = configService;

        return {
          global: true,
          secret: jwtConfig.jwt_secret_key,
          signOptions: {
            expiresIn: '60s',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [],
  exports: [NestJwtModule, JwtStrategy],
})
export class JwtModule {}

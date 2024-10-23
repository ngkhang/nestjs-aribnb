import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { JwtModule } from './jwt/jwt.module';
import { PrismaModule } from './prisma/prisma.module';

// TODO: Refactor Shared Module
@Global()
@Module({
  imports: [ConfigModule, PrismaModule, JwtModule],
  controllers: [],
  providers: [],
  exports: [SharedModule, ConfigModule, PrismaModule, JwtModule],
})
export class SharedModule {}

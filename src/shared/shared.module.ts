import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [ConfigService, PrismaService],
  exports: [SharedModule, PrismaService],
})
export class SharedModule {}

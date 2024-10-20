import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { APP_CONFIG_KEY, AppConfig } from './app.config';
import { DB_CONFIG_KEY, DbConfig } from './database.config';
import { JWT_CONFIG_KEY, JwtConfig } from './jwt.config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get appConfig(): AppConfig {
    return this.configService.get<AppConfig>(APP_CONFIG_KEY);
  }

  get dbConfig(): DbConfig {
    return this.configService.get<DbConfig>(DB_CONFIG_KEY);
  }

  get jwtConfig(): JwtConfig {
    return this.configService.get<JwtConfig>(JWT_CONFIG_KEY);
  }
}

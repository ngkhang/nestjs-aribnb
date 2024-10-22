import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { APP_CONFIG_KEY, AppConfig } from './app.config';
import { AUTH_CONFIG_KEY, AuthConfig } from './auth.config';
import { DB_CONFIG_KEY, DbConfig } from './database.config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get appConfig(): AppConfig {
    return this.configService.get<AppConfig>(APP_CONFIG_KEY);
  }

  get dbConfig(): DbConfig {
    return this.configService.get<DbConfig>(DB_CONFIG_KEY);
  }

  get authConfig(): AuthConfig {
    return this.configService.get<AuthConfig>(AUTH_CONFIG_KEY);
  }
}

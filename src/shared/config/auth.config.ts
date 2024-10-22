import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { validateConfig } from 'src/utils/validate-config.util';

export const AUTH_CONFIG_KEY = 'auth';

export interface AuthConfig {
  AUTH_JWT_SECRET_KEY: string;
  AUTH_JWT_TOKEN_EXPIRES_IN: string;
  AUTH_JWT_STRATEGY_KEY: string;
  AUTH_REFRESH_SECRET_KEY: string;
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
}

class EnvironmentVariables {
  @IsString()
  AUTH_JWT_SECRET_KEY: string;
  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;
  @IsString()
  AUTH_JWT_STRATEGY_KEY: string;
  @IsString()
  AUTH_REFRESH_SECRET_KEY: string;
  @IsString()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
}

const authConfig = registerAs(AUTH_CONFIG_KEY, (): AuthConfig => {
  const ENV = process.env;

  validateConfig(ENV, EnvironmentVariables);

  return {
    AUTH_JWT_SECRET_KEY: ENV.AUTH_JWT_SECRET_KEY,
    AUTH_JWT_TOKEN_EXPIRES_IN: ENV.AUTH_JWT_TOKEN_EXPIRES_IN,
    AUTH_JWT_STRATEGY_KEY: ENV.AUTH_JWT_STRATEGY_KEY,
    AUTH_REFRESH_SECRET_KEY: ENV.AUTH_REFRESH_SECRET_KEY,
    AUTH_REFRESH_TOKEN_EXPIRES_IN: ENV.AUTH_REFRESH_TOKEN_EXPIRES_IN,
  };
});

export default authConfig;

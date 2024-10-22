import { registerAs } from '@nestjs/config';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { validateConfig } from 'src/utils/validate-config.util';

export const APP_CONFIG_KEY = 'app';
export interface AppConfig {
  APP_PORT: number;
  APP_NAME: string;
  APP_HOST: string;
}

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  APP_PORT: number;

  @IsString()
  APP_NAME: string;

  @IsString()
  APP_HOST: string;
}

const appConfig = registerAs(APP_CONFIG_KEY, (): AppConfig => {
  const ENV = process.env;

  validateConfig(ENV, EnvironmentVariables);

  return {
    APP_NAME: ENV.APP_NAME || 'AirBnb API',
    APP_HOST: ENV.APP_HOST || 'localhost',
    APP_PORT: parseInt(ENV.APP_PORT, 10) || 3000,
  };
});

export default appConfig;

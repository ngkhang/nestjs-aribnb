import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { validateConfig } from 'src/utils/validate-config.util';

export const DB_CONFIG_KEY = 'db';
export interface DbConfig {
  DATABASE_URL: string;
}

class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;
}

const dbConfig = registerAs(DB_CONFIG_KEY, (): DbConfig => {
  const ENV = process.env;

  validateConfig(ENV, EnvironmentVariables);

  return {
    DATABASE_URL: ENV.DATABASE_URL,
  };
});

export default dbConfig;

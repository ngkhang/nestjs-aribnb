import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { validateConfig } from 'src/utils/validate-config.util';

export const DB_CONFIG_KEY = 'db';
export interface DbConfig {
  db_url: string;
}

class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;
}

export default registerAs(DB_CONFIG_KEY, (): DbConfig => {
  validateConfig(process.env, EnvironmentVariables);

  return {
    db_url: process.env.DATABASE_URL,
  };
});

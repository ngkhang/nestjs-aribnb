import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { validateConfig } from 'src/utils/validate-config.util';

export const JWT_CONFIG_KEY = 'jwt';

export interface JwtConfig {
  jwt_secret_key: string;
  jwt_strategy_key: string;
}

class EnvironmentVariables {
  @IsString()
  JWT_SECRET_KEY: string;
  @IsString()
  JWT_STRATEGY_KEY: string;
}

const jwtConfig = registerAs(JWT_CONFIG_KEY, (): JwtConfig => {
  validateConfig(process.env, EnvironmentVariables);

  return {
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    jwt_strategy_key: process.env.JWT_STRATEGY_KEY,
  };
});

export default jwtConfig;

/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/config/config.service';
import setupSwagger from './utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config Env App
  const configService = app.get(ConfigService);
  const { APP_HOST, APP_PORT } = configService.appConfig;
  const SERVER_PATH = `http://${APP_HOST}:${APP_PORT}`;

  // Setup Swagger
  setupSwagger(app, SERVER_PATH);

  // Listen Server
  await app.listen(APP_PORT, () =>
    console.log(`Server is running on: ${SERVER_PATH}`)
  );
}
bootstrap();

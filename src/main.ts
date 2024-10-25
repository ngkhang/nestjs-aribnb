/* eslint-disable no-console */
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppModule } from './app.module';
import { ConfigService } from './shared/config/config.service';
import setupSwagger from './utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  // Config Env App
  const configService = app.get(ConfigService);
  const { APP_HOST, APP_PORT } = configService.appConfig;
  const SERVER_PATH = `http://${APP_HOST}:${APP_PORT}`;

  // Apply global exception filter
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Auto-Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  // Apply global transformation
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Setup Swagger
  setupSwagger(app, SERVER_PATH);

  // Listen Server
  await app.listen(APP_PORT, () =>
    console.log(`Server is running on: ${SERVER_PATH}`)
  );
}
bootstrap();

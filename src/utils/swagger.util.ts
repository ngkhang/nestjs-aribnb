import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const URL_SWAGGER = '/swagger/v1/swagger.json';

const setupSwagger = (app: INestApplication, url: string) => {
  const configSwagger = new DocumentBuilder()
    .setExternalDoc(URL_SWAGGER, `${url}${URL_SWAGGER}`)
    .setTitle('AirBnb API')
    .setDescription('')
    .addBearerAuth({
      type: 'http',
      bearerFormat: 'JWT',
      scheme: 'bearer',
    })
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-docs', app, documentFactory, {
    jsonDocumentUrl: URL_SWAGGER,
  });
};

export default setupSwagger;

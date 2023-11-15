import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');

  const pkg = process.env.npm_package_version;

  const config = new DocumentBuilder()
    .setTitle('Nest CRM')
    .setDescription('The Nest CRM API')
    .setVersion(pkg ?? '0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('pug');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

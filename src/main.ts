import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { join } from 'path';
import { promises } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();

  const pkg = JSON.parse(
    await promises.readFile(join('.', 'package.json'), 'utf8'),
  );

  const config = new DocumentBuilder()
    .setTitle('Nest CRM')
    .setDescription('The nest crm API')
    .setVersion(pkg)
    .addTag('crm')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useStaticAssets(join(__dirname, '..', 'static'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

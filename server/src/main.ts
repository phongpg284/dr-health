import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const logger = new Logger('Server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Dr-health API')
    .setDescription('REST API list')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    logger.log(`Successfully listening on PORT: ${PORT}`);
  });
}

bootstrap();

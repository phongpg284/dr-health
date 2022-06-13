import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

const logger = new Logger('Server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    },
  });
  app.setGlobalPrefix('/api');

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
  await mqttApp.listen();
}

bootstrap();

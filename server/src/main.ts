import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MQTT_BROKER, MQTT_PASSWORD, MQTT_USERNAME, PORT } from './config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

const logger = new Logger('Server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  console.log('broker', MQTT_BROKER);
  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: MQTT_BROKER,
      // username: MQTT_USERNAME,
      // password: MQTT_PASSWORD,
    },
  });
  // console.log('mqttApp', mqttApp);
  app.setGlobalPrefix('/api');
  app.enableCors();

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

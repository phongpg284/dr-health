import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';

const logger = new Logger('Server');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    logger.log(`Successfully listening on PORT: ${PORT}`);
  });
}

bootstrap();

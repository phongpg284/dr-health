import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger } from '@nestjs/common';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from '.';

const logger = new Logger('MikroORM');

const config: Options = {
  type: 'postgresql',
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  dbName: DB_NAME,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],
  logger: logger.log.bind(logger),
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
};

export default config;

import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM');

const config: Options = {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'pilameton',
  dbName: 'dr_health',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  logger: logger.log.bind(logger),
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
};

export default config;

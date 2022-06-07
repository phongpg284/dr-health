import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM');

const config: Options = {
  type: 'postgresql',
  host: 'postgres',
  port: 5432,
  user: 'tpw284',
  password: 'pilameton',
  dbName: 'dr-health',
  entities: ['dist/**/*.entity.js'],
  // entities: ['src/**/*.entity.ts'],
  entitiesTs: ['src/**/*.entity.ts'],
  logger: logger.log.bind(logger),
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
};

export default config;

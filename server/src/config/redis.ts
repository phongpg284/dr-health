import { RedisModuleOptions } from '@nestjs-modules/ioredis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '.';

export const redisConfig: RedisModuleOptions = {
  config: {
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    password: REDIS_PASSWORD,
  },
};

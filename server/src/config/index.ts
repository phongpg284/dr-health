// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const PORT = parseInt(process.env.PORT) || 4000;
export const DB_PORT = parseInt(process.env.DB_PORT) || 5432;
export const DB_NAME = process.env.DB_NAME || 'db_name';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root';

export const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwt_key';
export const REFRESH_JWT_SECRET_KEY = process.env.REFRESH_JWT_SECRET_KEY || 'refresh_jwt_secret_key';
export const EXPIRE_JWT_SECRET_KEY = '300';
export const EXPIRE_REFRESH_JWT_SECRET_KEY = '100000';

export const { MQTT_BROKER = 'mqtt://localhost:1883', MQTT_BRAND = 'mandevices' } = process.env;

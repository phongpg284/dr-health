// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const PORT = parseInt(process.env.PORT) || 4000;
export const DB_PORT = parseInt(process.env.DB_PORT) || 5432;
export const DB_NAME = process.env.DB_NAME || 'postgres';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';

export const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwt_key';
export const REFRESH_JWT_SECRET_KEY =
  process.env.REFRESH_JWT_SECRET_KEY || 'refresh_jwt_secret_key';
export const EXPIRE_JWT_SECRET_KEY = '300';
export const EXPIRE_REFRESH_JWT_SECRET_KEY = '100000';

export const MQTT_PORT = parseInt(process.env.MQTT_PORT) || 1883;
export const MQTT_HOST = process.env.MQTT_HOST || 'localhost';
export const MQTT_BRAND = process.env.MQTT_BRAND || 'dr_health';
export const MQTT_BROKER = `mqtt://${MQTT_HOST}:${MQTT_PORT}`;
export const MQTT_USERNAME = process.env.MQTT_USERNAME || 'project_hust';
export const MQTT_PASSWORD = process.env.MQTT_PASSWORD || 'project_hust';

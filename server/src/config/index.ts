export const PORT = process.env.PORT || 4000;
export const DB_NAME = process.env.DB_NAME;
export const DB_ENDPOINT = process.env.DB_ENDPOINT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_URL =
  DB_USERNAME && DB_PASSWORD && DB_ENDPOINT
    ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_ENDPOINT}`
    : 'mongodb://localhost:27017';
export const JWT_KEY = process.env.JWT_KEY || 'jwt';

export const {
  MQTT_BROKER = 'mqtt://localhost:1883',
  MQTT_BRAND = 'mandevices',
} = process.env;

export const DOMAIN = process.env.DOMAIN || 'http://localhost:4001';
export const DOWNLOAD_DOMAIN =
  process.env.DOWNLOAD_DOMAIN || 'http://localhost:4001';

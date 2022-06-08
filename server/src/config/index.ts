export const PORT = parseInt(process.env.PORT) || 4000;
export const DB_PORT = parseInt(process.env.DB_PORT) || 5432;
export const DB_NAME = process.env.DB_NAME || 'db_name';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
export const JWT_KEY = process.env.JWT_KEY || 'jwt_key';

export const {
  MQTT_BROKER = 'mqtt://localhost:1883',
  MQTT_BRAND = 'mandevices',
} = process.env;

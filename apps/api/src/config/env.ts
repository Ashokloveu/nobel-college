import dotenv from 'dotenv';
import path from 'path';

// Load .env file from workspace root if running locally
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '10000', 10),
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  API_URL: process.env.API_URL || 'http://localhost:5000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nobel_college_db',
  JWT_SECRET: process.env.JWT_SECRET || 'nobel_college_super_secret_jwt_key_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'nobel_college_super_secret_refresh_key_2026',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'nobel_college_cookie_secret_key_2026',
  SMTP: {
    HOST: process.env.SMTP_HOST || 'localhost',
    PORT: parseInt(process.env.SMTP_PORT || '2525', 10),
    USER: process.env.SMTP_USER || '',
    PASS: process.env.SMTP_PASSWORD || '',
    FROM: process.env.EMAIL_FROM || 'Nobel Multiple College <info@nobelcollege.edu.np>',
  },
  STORAGE: {
    TYPE: process.env.STORAGE_TYPE || 'local',
    ENDPOINT: process.env.STORAGE_ENDPOINT || 'http://localhost:5000/uploads',
    UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  },
};

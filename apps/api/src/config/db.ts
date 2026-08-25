import mongoose from 'mongoose';
import dns from 'dns';
import { ENV } from './env';
import { logger } from '../utils/logger';

// Set public DNS resolvers for reliable MongoDB Atlas SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if custom DNS set is restricted
}

export const connectDB = async (retries = 5): Promise<void> => {
  while (retries > 0) {
    try {
      const conn = await mongoose.connect(ENV.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      logger.info(`MongoDB Connected: ${conn.connection.host} / DB: ${conn.connection.name}`);
      return;
    } catch (error: any) {
      retries -= 1;
      logger.error(`MongoDB connection attempt failed (${retries} retries left): ${error.message}`);
      if (retries === 0) {
        logger.error('Could not connect to MongoDB Atlas. Please check IP Access List (0.0.0.0/0).');
        throw error;
      }
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  logger.info('MongoDB connection closed.');
};

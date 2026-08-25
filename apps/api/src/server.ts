import { createApp } from './app';
import { connectDB, disconnectDB } from './config/db';
import { ENV } from './config/env';
import { logger } from './utils/logger';

const startServer = async () => {
  await connectDB();
  const app = createApp();

  const server = app.listen(ENV.PORT, () => {
    logger.info(`🚀 Nobel Multiple College API Server running on port ${ENV.PORT} [${ENV.NODE_ENV}]`);
  });

  const handleShutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Shutting down server gracefully...`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
};

startServer();

/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', err => {
  console.log('Uncaught exception is detected... ', err);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await RedisClient.Connect();
    await mongoose.connect(config.database_url as string);
    logger.info(`Database connected`);
    server = app.listen(config.port, () => {
      logger.info(`University app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connect Database`, error);
  }
  process.on('unhandledRejection', error => {
    console.log('Unhandled rejection detected, we are closing our server....');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    }
    process.exit(1);
  });
}
bootstrap();
process.on('SIGTERM', () => {
  logger.info('Sigterm is received');
  if (server) {
    server.close();
  }
});

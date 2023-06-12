import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

async function bootstrap() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    // await mongoose.connect('mongodb://127.0.0.1:27017/university-management')
    logger.info(`Database connected`)
    server = app.listen(config.port, () => {
      logger.info(`University app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connect Database`, error)
  }
  process.on('unhandledRejection', error => {
    console.log('Unhandled rejection detected, we are closing our server....')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    }
    process.exit(1)
  })
}
bootstrap()

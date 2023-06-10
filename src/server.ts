import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    // await mongoose.connect('mongodb://127.0.0.1:27017/university-management')
    logger.info(`Database connected`)
    app.listen(config.port, () => {
      logger.info(`University app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connect Database`, error)
  }
}
bootstrap()

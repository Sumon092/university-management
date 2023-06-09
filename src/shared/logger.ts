import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format

import path from 'path'

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return ` [${date} ${hour}:${min}:${sec} ${label}] ${level}: ${message}  `
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'error',
    }),
  ],
})
export { logger, errorLogger }

import { ErrorRequestHandler } from 'express'
import { IGenericErrMessage } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationError'
import config from '../../config'
import ApiError from '../../errors/ApiErrors'
import { Error } from 'mongoose'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IGenericErrMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : null,
  })
  next()
}

export default globalErrorHandler

import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   if (err instanceof Error) {
  //     res.status(500).json({ error: err })
  //   } else {
  //     res.status(400).json({ error: 'something went wrong' })
  //   }
  next()
}

export default globalErrorHandler

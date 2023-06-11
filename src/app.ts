import express, { Application } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrors'
import ApiError from './errors/ApiErrors'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
app.use('/api/v1/user/', UserRoutes)

// Testing
app.get('/', () => {
  throw new ApiError(400, 'ore baba error')
})

// Global error handler
app.use(globalErrorHandler)

export default app

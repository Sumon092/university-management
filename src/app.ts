import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrors'
const app: Application = express()

app.use(cors())

//application routes

//parser
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/user/', userRouter)
//testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('There is an error')
//   // next('an error occured')
// })

// Global error handler
app.use(globalErrorHandler)

export default app

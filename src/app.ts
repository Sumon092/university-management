import express, { Application, Response, Request } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

//application routes
app.use('/api/v1/user/', userRouter)

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  res.send('University app is running !')
})

export default app

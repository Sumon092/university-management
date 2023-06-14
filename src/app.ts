import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrors';
import routes from './app/routes';
import httpStatus from 'http-status';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api/v1', routes);

// Testing
// app.get('/', async () => {
//   // console.log(x)
//   Promise.reject(new Error('Unhandled promise Rejection'));
// });

// Global error handler
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not found',
      },
    ],
  });
  //   next();
});

export default app;

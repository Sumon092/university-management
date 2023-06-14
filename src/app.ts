import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrors';
import routes from './app/routes';
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

export default app;

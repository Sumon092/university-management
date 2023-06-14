import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/user.route';
import globalErrorHandler from './app/middleware/globalErrors';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api/v1/user/', UserRoutes);

// Testing
app.get('/', async () => {
  // console.log(x)
  Promise.reject(new Error('Unhandled promise Rejection'));
});

// Global error handler
app.use(globalErrorHandler);

export default app;

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrors';
import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routes);

// Global error handler
app.use(globalErrorHandler);

// Handle not found
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
});

export default app;

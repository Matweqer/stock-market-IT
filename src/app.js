import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {
  authRouter, usersRouter,
  customersRouter, executorsRouter,
  tasksRouter, requestsRouter,
} from './routes';
import { errorHandler } from './middlewares';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/executors', executorsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/requests', requestsRouter);

app.use(errorHandler);

export default app;

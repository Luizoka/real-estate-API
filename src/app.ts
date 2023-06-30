import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import {
  categorieRouter,
  realEstateRouter,
  scheduleRouter,
  sessionRouter,
  userRouter,
} from './routers';

const app: Application = express();

app.use(express.json());

app.use('/users', userRouter);

app.use('/login', sessionRouter);

app.use('/categories', categorieRouter);

app.use('/realEstate', realEstateRouter);

app.use('/schedules', scheduleRouter);

export default app;

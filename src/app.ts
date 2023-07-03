import 'express-async-errors';
import express, { Application, json } from 'express';
import middlewares from './middlewares';
import {
  categorieRouter,
  realEstateRouter,
  scheduleRouter,
  sessionRouter,
  userRouter,
} from './routers';

const app: Application = express();
app.use(json());

app.use('/users', userRouter);

app.use('/login', sessionRouter);

app.use('/categories', categorieRouter);

app.use('/realEstate', realEstateRouter);

app.use('/schedules', scheduleRouter);

app.use(middlewares.handleError);

export default app;

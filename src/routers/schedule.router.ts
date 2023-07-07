import { Router } from 'express';
import scheduleControllers from '../controllers/schedule.controllers';
import middlewares from '../middlewares';
import { scheduleCreateSchema } from '../schemas';

const scheduleRouter: Router = Router();

scheduleRouter.post(
  '',
  middlewares.verifyToken,
  middlewares.validateBody(scheduleCreateSchema),
  scheduleControllers.createSchedules
);

scheduleRouter.get(
  '/realEstate/:id',
  middlewares.verifyToken,
  middlewares.validateTypeOfUser,
  middlewares.verifyAdm,
  scheduleControllers.getAllScheduless
);

export default scheduleRouter;

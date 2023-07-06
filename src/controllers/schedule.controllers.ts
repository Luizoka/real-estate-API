import {
  ScheduleCreate,
  ScheduleRepo,
  ScheduleRead,
  ScheduleReturn,
} from '../interfaces';
import { scheduleServices } from '../services';
import { Request, Response } from 'express';

import scheduleRouter from './../routers/schedule.router';

const createSchedules = async (req: Request, res: Response): Promise<Response> => {
  const { realEstateId, date, hour } = req.body;
  /*   const userId: number = Number(res.locals.decoded.sub); */
  /*   let count = 0;
  console.log('AGORA ÜE ', count++);
  console.log('controller hora', hour);
  console.log('controller dia', date);
  console.log('controller realstate', realEstateId);
  console.log('controller id do usuario', res.locals.decoded); */

  /*  const newCategory = await categoryServices.createCategory(req.body.categoryToCreate);
  const categoryFoundId = newCategory.id; */

  const schedules = await scheduleServices.createSchedule(1, req.body);
  return res.status(201).json({ message: 'Schedule created' });
};

/* const getAllScheduless = async (req: Request, res: Response): Promise<Response> => {
  const allSchedules: ScheduleRead = await scheduleServices.getAllSchedules();

  return res.status(200).json(allSchedules);
}; */
export default { createSchedules /* getAllScheduless */ };

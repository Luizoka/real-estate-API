import {
  ScheduleCreate,
  ScheduleRepo,
  ScheduleRead,
  ScheduleReturn,
  ScheduleByRealEstateReturn,
} from '../interfaces';
import { scheduleServices } from '../services';
import { Request, Response } from 'express';

import scheduleRouter from './../routers/schedule.router';

const createSchedules = async (req: Request, res: Response): Promise<Response> => {
  const { realEstateId, date, hour } = req.body;

  const schedules = await scheduleServices.createSchedule(1, req.body);
  return res.status(201).json({ message: 'Schedule created' });
};

const getAllScheduless = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const allSchedules: ScheduleByRealEstateReturn = await scheduleServices.getAllSchedules(
    Number(id)
  );

  return res.status(200).json(allSchedules);
};
export default { createSchedules, getAllScheduless };

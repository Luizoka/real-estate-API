import { z } from 'zod';

import { scheduleSchema, scheduleCreateSchema, scheduleReadSchema } from '../schemas';
import { Schedule } from '../entities';
import { Repository } from 'typeorm';

type ScheduleCreate = z.infer<typeof scheduleCreateSchema>;
type ScheduleRead = z.infer<typeof scheduleReadSchema>;

type ScheduleRepo = Repository<Schedule>;

export { ScheduleCreate, ScheduleRead, ScheduleRepo };

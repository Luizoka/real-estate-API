import { z } from 'zod';

import {
  scheduleCreateSchema,
  scheduleReadSchema,
  scheduleReturnSchema,
  scheduleOnlySchema,
  realEstateReturnFilterScheduleSchema,
} from '../schemas';
import { Schedule } from '../entities';
import { Repository } from 'typeorm';

type ScheduleCreate = z.infer<typeof scheduleCreateSchema>;

type ScheduleRead = z.infer<typeof scheduleReadSchema>;

type ScheduleReturn = z.infer<typeof scheduleReturnSchema>;

type ScheduleByRealEstateReturn = z.infer<typeof realEstateReturnFilterScheduleSchema>;

type ScheduleOnly = z.infer<typeof scheduleOnlySchema>;

type ScheduleRepo = Repository<Schedule>;

export {
  ScheduleCreate,
  ScheduleRead,
  ScheduleRepo,
  ScheduleReturn,
  ScheduleByRealEstateReturn,
  ScheduleOnly,
};

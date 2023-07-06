import { z } from 'zod';
import { realEstateSchema } from './realEstate.schemas';
import { userSchema } from './user.schemas';

const scheduleSchema = z.object({
  id: z.number().positive(),

  date: z.string(),

  hour: z.string(),

  realEstateId: z.number().int(),

  realEstate: realEstateSchema,

  userId: z.number().int(),

  user: userSchema,
});

const scheduleCreateSchema = scheduleSchema.omit({
  id: true,
  userId: true,
  realEstate: true,
  user: true,
});

const scheduleReturnSchema = scheduleSchema.omit({ user: true, realEstate: true });

const scheduleReadSchema = scheduleSchema.array();

export { scheduleSchema, scheduleCreateSchema, scheduleReadSchema, scheduleReturnSchema };

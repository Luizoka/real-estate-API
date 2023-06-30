import { z } from 'zod';

const scheduleSchema = z.object({
  id: z.number().positive(),

  date: z.coerce.date(),

  hour: z.string().datetime(),

  realEstateId: z.number().int(),

  userId: z.number().int(),
});

const scheduleCreateSchema = scheduleSchema.omit({ id: true });

const scheduleReadSchema = scheduleSchema.array();

export { scheduleSchema, scheduleCreateSchema, scheduleReadSchema };

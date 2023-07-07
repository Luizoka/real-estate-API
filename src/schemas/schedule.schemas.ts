import { z } from 'zod';
import { realEstateSchema } from './realEstate.schemas';
import { userReturnSchema, userSchema } from './user.schemas';
import { addressReturnSchema } from './address.schema';
import { categoryReturnSchema } from './category.schemas';

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

const scheduleOnlySchema = scheduleSchema
  .omit({
    realEstate: true,
    realEstateId: true,
    userId: true,
  })
  .extend({ user: userReturnSchema.omit({ deletedAt: true, name: true, id: true }) })
  .array();

const realEstateReturnFilterScheduleSchema = realEstateSchema
  .omit({
    categoryId: true,
    size: true,
    value: true,
    sold: true,
    updatedAt: true,
  })
  .extend({
    schedules: scheduleOnlySchema,
    address: addressReturnSchema,
    category: categoryReturnSchema,
  });

const scheduleReadSchema = scheduleReturnSchema.array();

export {
  scheduleSchema,
  scheduleCreateSchema,
  scheduleReadSchema,
  scheduleReturnSchema,
  scheduleOnlySchema,
  realEstateReturnFilterScheduleSchema,
};

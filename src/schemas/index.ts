import {
  addressSchema,
  addressCreateSchema,
  addressReturnSchema,
  addressReturnIdSchema,
} from './address.schema';
import {
  categorySchema,
  categoryCreateSchema,
  categoryReadSchema,
  categoryReturnSchema,
  categoryReturnNameSchema,
} from './category.schemas';
import {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReadSchema,
  realEstateReturnFilterCategorySchema,
  realEstateOnlySchema,
  realEstateOnlyWithoutNameSchema,
} from './realEstate.schemas';
import {
  scheduleSchema,
  scheduleCreateSchema,
  scheduleReadSchema,
  scheduleReturnSchema,
  scheduleOnlySchema,
  realEstateReturnFilterScheduleSchema,
} from './schedule.schemas';
import { sessionSchema } from './session.schemas';
import {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userUpdateSchema,
} from './user.schemas';

export {
  addressSchema,
  addressCreateSchema,
  addressReturnSchema,
  addressReturnIdSchema,
  categorySchema,
  categoryCreateSchema,
  categoryReadSchema,
  categoryReturnNameSchema,
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReadSchema,
  realEstateReturnFilterCategorySchema,
  realEstateOnlyWithoutNameSchema,
  realEstateOnlySchema,
  scheduleSchema,
  scheduleCreateSchema,
  scheduleReadSchema,
  scheduleReturnSchema,
  scheduleOnlySchema,
  realEstateReturnFilterScheduleSchema,
  sessionSchema,
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userUpdateSchema,
  categoryReturnSchema,
};

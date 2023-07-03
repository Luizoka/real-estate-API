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
  categoryReturnIdSchema,
  realEstateByCategorySchema,
} from './category.schemas';
import {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReadSchema,
} from './realEstate.schemas';
import {
  scheduleSchema,
  scheduleCreateSchema,
  scheduleReadSchema,
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
  categoryReturnIdSchema,
  realEstateByCategorySchema,
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReadSchema,
  scheduleSchema,
  scheduleCreateSchema,
  scheduleReadSchema,
  sessionSchema,
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userUpdateSchema,
  categoryReturnSchema,
};

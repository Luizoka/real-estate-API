import { z } from 'zod';
import {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReadSchema,
} from '../schemas';

import { RealEstate } from '../entities';
import { DeepPartial } from 'typeorm';

type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;
type RealEstateRead = z.infer<typeof realEstateReadSchema>;

type realEstateReturn = z.infer<typeof realEstateReturnSchema>;

type RealEstateUpdade = DeepPartial<RealEstate>;

export { RealEstateCreate, RealEstateRead, realEstateReturn, RealEstateUpdade };

import { z } from 'zod';
import {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReadSchema,
} from '../schemas';

import { RealEstate } from '../entities';
import { DeepPartial, Repository } from 'typeorm';

type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;

type RealEstateReturn = z.infer<typeof realEstateReturnSchema>;

type RealEstateRead = Array<RealEstateReturn>;

type RealEstateRepo = Repository<RealEstate>;

/* type RealEstateUpdade = DeepPartial<RealEstate>; */

export { RealEstateCreate, RealEstateRead, RealEstateReturn, RealEstateRepo };

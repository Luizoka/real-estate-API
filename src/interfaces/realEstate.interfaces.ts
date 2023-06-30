import { z } from 'zod';
import {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateAdressSchema,
  realEstateReadSchema,
} from '../schemas';

import { RealEstate } from '../entities';
import { DeepPartial } from 'typeorm';

type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;
type RealEstateRead = z.infer<typeof realEstateReadSchema>;

type RealEstateAdressSchema = z.infer<typeof realEstateAdressSchema>;

type RealEstateUpdate = DeepPartial<RealEstate>;

type RealEstateUpdade = DeepPartial<RealEstate>;

export {
  RealEstateCreate,
  RealEstateRead,
  RealEstateAdressSchema,
  RealEstateUpdate,
  RealEstateUpdade,
};

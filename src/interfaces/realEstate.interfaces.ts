import { z } from 'zod';
import {
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReturnFilterCategorySchema,
  realEstateOnlySchema,
  realEstateOnlyWithoutNameSchema,
} from '../schemas';

import { RealEstate } from '../entities';
import { Repository } from 'typeorm';

type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;

type RealEstateReturn = z.infer<typeof realEstateReturnSchema>;

type RealEstateOnlyReturn = z.infer<typeof realEstateOnlyWithoutNameSchema>;

type RealEstateOnly = z.infer<typeof realEstateOnlySchema>;

type RealEstateRead = Array<RealEstateReturn>;

type RealEstateRepo = Repository<RealEstate>;

type RealEstateReturnFilterCategory = z.infer<
  typeof realEstateReturnFilterCategorySchema
>;

export {
  RealEstateCreate,
  RealEstateRead,
  RealEstateReturn,
  RealEstateRepo,
  RealEstateReturnFilterCategory,
  RealEstateOnlyReturn,
  RealEstateOnly,
};

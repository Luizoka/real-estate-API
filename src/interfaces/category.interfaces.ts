import { z } from 'zod';

import { Category } from '../entities';

import { DeepPartial, Repository } from 'typeorm';

import {
  categorySchema,
  categoryReturnSchema,
  categoryCreateSchema,
  categoryReadSchema,
  realEstateByCategorySchema,
  categoryReturnNameSchema,
} from '../schemas';

type CategoryCreate = z.infer<typeof categoryCreateSchema>;

type CategoryRead = z.infer<typeof categoryReadSchema>;

type CategoryReturn = z.infer<typeof categoryReturnSchema>;

type CategoryReturnName = z.infer<typeof categoryReturnNameSchema>;

type CategoryRealEstateFilter = z.infer<typeof realEstateByCategorySchema>;

type CategoryRepo = Repository<Category>;
type CategoryUpdate = DeepPartial<Category>;

export {
  CategoryCreate,
  CategoryRead,
  CategoryRealEstateFilter,
  CategoryRepo,
  CategoryUpdate,
  CategoryReturn,
  CategoryReturnName,
};

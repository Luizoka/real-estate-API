import { z } from 'zod';

import { Category } from '../entities';

import { DeepPartial, Repository } from 'typeorm';

import {
  categorySchema,
  categoryCreateSchema,
  categoryReadSchema,
  realEstateByCategorySchema,
} from '../schemas';

type CategoryCreate = z.infer<typeof categoryCreateSchema>;

type CategoryRead = z.infer<typeof categoryReadSchema>;

type CategoryRealEstateFilter = z.infer<typeof realEstateByCategorySchema>;

type CategoryRepo = Repository<Category>;
type CategoryUpdate = DeepPartial<Category>;

export {
  CategoryCreate,
  CategoryRead,
  CategoryRealEstateFilter,
  CategoryRepo,
  CategoryUpdate,
};

import { number, z } from 'zod';
import {
  addressCreateSchema,
  addressReturnSchema,
  addressSchema,
} from './address.schema';
import { categoryReturnNameSchema, categoryReturnSchema } from './category.schemas';

const realEstateSchema = z.object({
  id: z.number().positive(),

  value: z
    .number()
    .multipleOf(0.01)
    .default(0)
    .or(z.string().regex(/^\d+(\.\d{2})?$/)),

  size: z.number().int().positive(),

  sold: z.boolean().default(() => false),

  address: addressSchema,

  category: categoryReturnNameSchema,

  categoryId: z.number().int(),

  createdAt: z.string().or(z.date()),

  updatedAt: z.string().or(z.date()),
});

const realEstateCreateSchema = realEstateSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    category: true,
  })
  .extend({
    address: addressCreateSchema,
  });

const realEstateReturnSchema = realEstateSchema.omit({ categoryId: true }).extend({
  address: addressReturnSchema,
  category: categoryReturnSchema,
});

const realEstateOnlyWithoutNameSchema = realEstateSchema
  .omit({
    address: true,
    category: true,
    categoryId: true,
  })
  .array();

const realEstateOnlySchema = realEstateSchema
  .omit({
    address: true,
    category: true,
    categoryId: true,
  })
  .array();

const realEstateReturnFilterCategorySchema = realEstateSchema
  .omit({
    categoryId: true,
    address: true,
    id: true,
    size: true,
    value: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
    category: true,
  })
  .extend({ id: z.number(), name: z.string(), realEstate: realEstateOnlySchema });

const realEstateReadSchema = realEstateReturnSchema.array();

export {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReadSchema,
  realEstateReturnFilterCategorySchema,
  realEstateOnlySchema,
  realEstateOnlyWithoutNameSchema,
};

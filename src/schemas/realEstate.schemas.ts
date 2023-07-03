import { z } from 'zod';
import {
  addressCreateSchema,
  addressReturnIdSchema,
  addressReturnSchema,
  addressSchema,
} from './address.schema';
import {
  categoryCreateSchema,
  categoryReturnIdSchema,
  categoryReturnSchema,
  categorySchema,
} from './category.schemas';

const realEstateSchema = z.object({
  id: z.number().positive(),

  value: z
    .number()
    .multipleOf(0.01)
    .default(0)
    .or(z.string().regex(/^\d+(\.\d{2})?$/)),

  size: z.number().int(),

  sold: z.boolean().default(() => false),

  address: addressSchema,

  addressId: z.number().int(),

  categoryToCreate: categorySchema,

  categoryId: z.number().int(),

  createdAt: z.date(),

  updatedAt: z.date(),
});

const realEstateCreateSchema = realEstateSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    addressId: true,
    categoryId: true,
  })
  .extend({
    address: addressCreateSchema,
    categoryToCreate: categoryCreateSchema,
  });

const realEstateReturnSchema = realEstateSchema.omit({
  address: true,
  categoryToCreate: true,
});

const realEstateReadSchema = realEstateReturnSchema.array();

export {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReadSchema,
};

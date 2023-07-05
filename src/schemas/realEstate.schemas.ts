import { number, z } from 'zod';
import {
  addressCreateSchema,
  addressReturnIdSchema,
  addressReturnSchema,
  addressSchema,
} from './address.schema';
import {
  categoryCreateSchema,
  categoryReturnNameSchema,
  categoryReturnSchema,
  /*   categoryReturnIdSchema,
  categoryReturnSchema, */
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

  category: categorySchema,

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
  /*   category: categoryReturnNameSchema, */
  category: categoryReturnNameSchema,
});

const realEstateReadSchema = realEstateReturnSchema.array();

export {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateReturnSchema,
  realEstateReadSchema,
};

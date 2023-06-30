import { z } from 'zod';
import { addressSchema } from './address.schema';

const realEstateSchema = z.object({
  id: z.number().positive(),

  value: z
    .number()
    .multipleOf(0.01)
    .default(() => 0),

  size: z.number().int(),

  addressId: z.number().int(),

  categoryId: z.number().int(),

  sold: z.boolean().default(() => false),

  createdAt: z.date(),

  updatedAt: z.date(),
});

const realEstateCreateSchema = realEstateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const realEstateReadSchema = realEstateSchema.omit({ id: true }).array();

const realEstateAdressSchema = realEstateSchema.omit({ addressId: true }).extend({
  adress: addressSchema,
});

export {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateAdressSchema,
  realEstateReadSchema,
};

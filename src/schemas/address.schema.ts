import { z } from 'zod';

const addressSchema = z.object({
  id: z.number().positive(),

  street: z.string().max(45),

  zipCode: z.string().max(8),

  number: z.string().max(7).nullable().optional(),

  city: z.string().max(20),

  state: z.string().max(2),
});

const addressCreateSchema = addressSchema.omit({ id: true });

const addressReturnSchema = addressSchema;

const addressReturnIdSchema = addressSchema.omit({
  street: true,
  zipCode: true,
  number: true,
  city: true,
  state: true,
});

export { addressSchema, addressCreateSchema, addressReturnSchema, addressReturnIdSchema };

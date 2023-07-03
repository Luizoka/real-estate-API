import { z } from 'zod';
import { realEstateSchema } from './realEstate.schemas';

const categorySchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
});

const categoryCreateSchema = categorySchema.omit({ id: true });

const categoryReturnSchema = categorySchema;

const categoryReturnIdSchema = categorySchema.omit({ name: true });

const categoryReadSchema = categorySchema.array();

const realEstateByCategorySchema = categoryReturnSchema.extend({
  realEstate: realEstateSchema.array(),
});

export {
  categorySchema,
  categoryCreateSchema,
  categoryReadSchema,
  categoryReturnSchema,
  categoryReturnIdSchema,
  realEstateByCategorySchema,
};

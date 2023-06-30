import { z } from 'zod';
import { realEstateSchema } from './realEstate.schemas';

const categorySchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
});

const categoryCreateSchema = categorySchema.omit({ id: true });

const categoryReturnSchema = categorySchema.omit({ id: true });

const categoryReadSchema = categoryCreateSchema.array();

const realEstateByCategorySchema = categoryReturnSchema.extend({
  realEstate: realEstateSchema.array(),
});

export {
  categorySchema,
  categoryCreateSchema,
  categoryReadSchema,
  realEstateByCategorySchema,
};

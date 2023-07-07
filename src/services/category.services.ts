import { Category, RealEstate } from '../entities';
import { AppError } from '../errors';
import {
  CategoryCreate,
  CategoryRead,
  CategoryReturn,
  RealEstateOnly,
  RealEstateReturnFilterCategory,
} from '../interfaces';
import { categoryRepository, realEstateRepository } from '../repositories';
import {
  categoryReadSchema,
  categorySchema,
  realEstateReturnFilterCategorySchema,
  realEstateSchema,
} from '../schemas';

const createCategory = async (payload: CategoryCreate): Promise<Category> => {
  const category: Category = categoryRepository.create(payload);
  await categoryRepository.save(category);

  return category;
};

const getAllCategories = async (): Promise<CategoryRead> => {
  return categoryReadSchema.parse(await categoryRepository.find());
};

const getCategorybyId = async (
  categoryId: number
): Promise<RealEstateReturnFilterCategory> => {
  const foundCategory: CategoryReturn = (await categoryRepository.findOneBy({
    id: categoryId,
  }))!;

  if (!foundCategory) throw new AppError('Category not found', 404);

  const response: RealEstateOnly = await realEstateRepository.findBy({
    category: foundCategory,
  });

  const filterFinal = realEstateReturnFilterCategorySchema.parse({
    id: foundCategory.id,
    name: foundCategory.name,
    realEstate: response,
  });
  return filterFinal;
};
export default { createCategory, getAllCategories, getCategorybyId };

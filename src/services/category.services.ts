import { Category } from '../entities';
import { CategoryCreate, CategoryRead, CategoryReturn } from '../interfaces';
import { categoryRepository } from '../repositories';
import { categoryReadSchema, categorySchema } from '../schemas';

const createCategory = async (payload: CategoryCreate): Promise<Category> => {
  const category: Category = categoryRepository.create(payload);
  await categoryRepository.save(category);

  return category;
};

const getAllCategories = async (): Promise<CategoryRead> => {
  return categoryReadSchema.parse(await categoryRepository.find());
};

const getCategorybyId = async (categoryId: number): Promise<CategoryReturn> => {
  return categorySchema.parse(
    await categoryRepository.findOneBy({ id: Number(categoryId) })
  );
};
export default { createCategory, getAllCategories, getCategorybyId };

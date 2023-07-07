import { Router } from 'express';
import categoryControllers from '../controllers/category.controllers';
import middlewares from '../middlewares';
import { categoryCreateSchema } from '../schemas';

const categorieRouter: Router = Router();

categorieRouter.post(
  '',
  middlewares.verifyToken,
  middlewares.verifyAdm,
  middlewares.validateBody(categoryCreateSchema),
  middlewares.uniqueCategory,
  categoryControllers.createCategory
);

categorieRouter.get('', categoryControllers.getAllCategories);

categorieRouter.get('/:id/realEstate', categoryControllers.getCategoryById);

export default categorieRouter;

import { Router } from 'express';
import { realEstateControllers } from '../controllers';
import middlewares from '../middlewares';
import { realEstateCreateSchema } from '../schemas';

const realEstateRouter: Router = Router();

realEstateRouter.post(
  '',
  middlewares.verifyToken,
  middlewares.verifyAdm,
  middlewares.validateBody(realEstateCreateSchema),
  realEstateControllers.createRealEstate
);

realEstateRouter.get('', realEstateControllers.getAllRealEstates);

export default realEstateRouter;

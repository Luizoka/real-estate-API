import { Router } from 'express';
import { realEstateControllers } from '../controllers';
import middlewares from '../middlewares';
import { realEstateCreateSchema, realEstateReadSchema } from '../schemas';

const realEstateRouter: Router = Router();

realEstateRouter.post(
  '',
  middlewares.verifyToken,
  middlewares.verifyAdm,
  middlewares.validateBody(realEstateCreateSchema),
  realEstateControllers.createRealEstate
);

realEstateRouter.get(
  '',
  middlewares.validateBody(realEstateReadSchema),
  realEstateControllers.getAllRealEstates
);

export default realEstateRouter;

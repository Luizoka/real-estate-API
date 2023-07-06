import { Router } from 'express';
import { realEstateControllers } from '../controllers';
import middlewares from '../middlewares';
import { addressSchema, realEstateCreateSchema, realEstateReadSchema } from '../schemas';
import { validateBody } from '../middlewares/validateBody.middleware';

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

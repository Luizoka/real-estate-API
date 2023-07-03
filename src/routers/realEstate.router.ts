import { Router } from 'express';
import { realEstateControllers } from '../controllers';

const realEstateRouter: Router = Router();

realEstateRouter.post('', realEstateControllers.createRealEstate);

realEstateRouter.get('');

export default realEstateRouter;

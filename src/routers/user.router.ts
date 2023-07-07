import { Router } from 'express';
import { userControllers } from '../controllers';
import middlewares from '../middlewares';
import { userCreateSchema, userUpdateSchema } from '../schemas';

const userRouter: Router = Router();

userRouter.post(
  '',
  middlewares.validateBody(userCreateSchema),
  middlewares.confirmUniqueEmail,
  userControllers.createUser
);

userRouter.get(
  '',
  middlewares.verifyToken,
  middlewares.verifyAdm,
  userControllers.getAllUsers
);

userRouter.patch(
  '/:id',

  middlewares.verifyToken,
  middlewares.validateId,
  middlewares.validateBody(userUpdateSchema),
  middlewares.validateTypeOfUser,
  userControllers.updateUser
);

userRouter.delete(
  '/:id',
  middlewares.validateId,
  middlewares.verifyToken,
  middlewares.validateTypeOfUser,
  userControllers.deletUser
);

export default userRouter;

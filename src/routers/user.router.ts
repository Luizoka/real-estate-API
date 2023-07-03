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

userRouter.patch('/:id', userControllers.updateUser);
middlewares.validateBody(userUpdateSchema),
  middlewares.verifyToken,
  middlewares.verifyAdm,
  userRouter.delete('/:id');

export default userRouter;

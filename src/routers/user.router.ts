import { Router } from 'express';
import { userControllers } from '../controllers';
import middlewares from '../middlewares';
import { userCreateSchema } from '../schemas';

const userRouter: Router = Router();

userRouter.post(
  '',
  middlewares.validateBody(userCreateSchema),
  middlewares.confirmUniqueEmail,
  userControllers.createUser
);

userRouter.get('', middlewares.verifyAdm, userControllers.getAllUsers);

userRouter.patch('/:id');

userRouter.delete('/:id');

export default userRouter;

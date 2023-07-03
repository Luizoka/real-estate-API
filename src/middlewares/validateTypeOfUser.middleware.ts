import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { userRepository } from '../repositories';

const validateTypeOfUser = (req: Request, res: Response, next: NextFunction): void => {
  const { admin, sub } = res.locals.decoded;
  const { id } = req.params;
  /*  console.log('esse veio do body', req.body.admin);
  console.log('decoded admin', admin); */

  /*   if (req.body.admin) {
    throw new AppError('Insufficient permission', 403);
  } */

  if (admin) return next();

  if (Number(sub) !== Number(id)) {
    throw new AppError('Insufficient permission', 403);
  }

  return next();
};

export { validateTypeOfUser };

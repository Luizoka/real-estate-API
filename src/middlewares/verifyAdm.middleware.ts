import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';

const verifyAdm = (req: Request, res: Response, next: NextFunction): void => {
  const adm: boolean = res.locals.decoded.admin;
  if (!adm) throw new AppError('Insufficient permissions', 403);

  return next();
};

export { verifyAdm };

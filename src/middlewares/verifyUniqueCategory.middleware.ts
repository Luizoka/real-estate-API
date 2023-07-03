import { NextFunction, Request, Response } from 'express';
import { Category } from '../entities';
import { categoryRepository } from '../repositories';
import { AppError } from '../errors';

const uniqueCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name: string = req.body.name;
  if (!name) return next();

  const foundEntity: Category | null = await categoryRepository.findOneBy({ name });
  if (foundEntity) throw new AppError('Category already exists', 409);

  return next();
};

export { uniqueCategory };

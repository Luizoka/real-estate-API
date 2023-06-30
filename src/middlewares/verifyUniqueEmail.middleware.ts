import { userRepository } from '../repositories';
import { AppError } from '../errors';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities';

export const confirmUniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = req.body.email;

  if (!email) return next();

  const checkEmail: User | null = await userRepository.findOneBy({ email });
  if (checkEmail) throw new AppError('Email already exists', 409);

  return next();
};

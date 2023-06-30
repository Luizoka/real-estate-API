import { Request, Response } from 'express';
import { userServices } from '../services';
import { UserRead, UserReturn, UserUpdate } from '../interfaces';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.createUser(req.body);
  return res.status(201).json(user);
};

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const admin: boolean = res.locals.decoded.admin;
  const allUsers: UserRead = await userServices.getAllUsers(admin);

  return res.status(200).json(allUsers);
};

export default { createUser, getAllUsers };

import { Request, Response } from 'express';
import { userServices } from '../services';
import { UserRead, UserReturn, UserUpdate } from '../interfaces';
import { User } from '../entities';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.createUser(req.body);
  return res.status(201).json(user);
};

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const admin: boolean = res.locals.decoded.admin;
  const allUsers: UserRead = await userServices.getAllUsers(admin);

  return res.status(200).json(allUsers);
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const foundUser = res.locals.user;
  const userUpdate = req.body;
  const userId = req.params.id;

  const user: UserReturn = await userServices.updateUser(userId, foundUser, userUpdate);

  return res.status(200).json(user);
};

const deletUser = async (req: Request, res: Response): Promise<Response> => {
  await userServices.deleteUser(res.locals.foundEntity);
  return res.status(204).json();
};

export default { createUser, getAllUsers, updateUser, deletUser };

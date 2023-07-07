import { UserCreate, UserRead, UserReturn, UserUpdate } from '../interfaces';
import { User } from '../entities';
import { userRepository } from '../repositories';
import { userReturnSchema, userReadSchema } from '../schemas';

import { hash } from 'bcryptjs';
import { AppError } from '../errors';

const createUser = async (payload: UserCreate): Promise<UserReturn> => {
  const user: User = userRepository.create(payload);
  await userRepository.save(user);
  return userReturnSchema.parse(user);
};

const getAllUsers = async (admin: boolean): Promise<UserRead> => {
  if (admin) {
    const allUsers: Array<User> = await userRepository.find({ withDeleted: true });
    return userReadSchema.parse(allUsers);
  }
  return userReadSchema.parse(await userRepository.find());
};

const updateUser = async (
  userId: string,
  user: User,
  payload: UserUpdate
): Promise<UserReturn> => {
  if (payload.password) {
    payload.password = await hash(payload.password, 10);
  }

  const foundUser = await userRepository.findOneBy({ id: Number(userId) });

  if (!foundUser) throw new AppError('User not found', 404);

  const userUpdated: User = await userRepository.create({ ...foundUser, ...payload });

  await userRepository.save(userUpdated);

  return userReturnSchema.parse(userUpdated);
};

const deleteUser = async (user: User): Promise<void> => {
  await userRepository.softRemove(user);
};

export default { createUser, getAllUsers, updateUser, deleteUser };

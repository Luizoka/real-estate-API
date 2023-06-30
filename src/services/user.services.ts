import { UserCreate, UserRead, UserReturn, UserUpdate, UserRepo } from '../interfaces';
import { User } from '../entities';
import { userRepository } from '../repositories';
import {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userUpdateSchema,
} from '../schemas';

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

const updateUser = async () => {};

const deleteUser = async () => {};

export default { createUser, getAllUsers, updateUser, deleteUser };

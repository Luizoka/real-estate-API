import { compare } from 'bcryptjs';
import { User } from '../entities';
import { SessionCreate, SessionReturn } from '../interfaces';
import { sign } from 'jsonwebtoken';
import { userRepository } from '../repositories';
import { AppError } from '../errors';

const createToken = async ({
  email,
  password,
}: SessionCreate): Promise<SessionReturn> => {
  const foundUserByEmail: User | null = await userRepository.findOneBy({ email });

  if (!foundUserByEmail) {
    throw new AppError('Invalid credentials', 401);
  }

  const comparePwd: boolean = await compare(password, foundUserByEmail.password);

  if (!comparePwd) {
    throw new AppError('Invalid credentials', 401);
  }

  const token: string = sign({ admin: foundUserByEmail.admin }, process.env.SECRET_KEY!, {
    subject: foundUserByEmail.id.toString(),
    expiresIn: process.env.EXPIRES_IN!,
  });

  return { token };
};

export default { createToken };

import { compare } from 'bcryptjs';
import { User } from '../entities';
import { SessionCreate, SessionReturn } from '../interfaces';
import { sign, SignOptions } from 'jsonwebtoken';
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

  const expiresIn: any = process.env.EXPIRES_IN ? process.env.EXPIRES_IN : '7d';

  const options: SignOptions = {
    subject: foundUserByEmail.id.toString(),
    expiresIn: expiresIn,
  };

  const token: string = sign(
    { admin: foundUserByEmail.admin },
    process.env.SECRET_KEY as string,
    options
  );

  return { token };
};

export default { createToken };

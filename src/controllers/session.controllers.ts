import { AppError } from '../errors';
import sessionServices from '../services/session.services';
import { SessionReturn, SessionCreate } from '../interfaces';
import { sessionSchema } from '../schemas';
import { Request, Response } from 'express';

const login = async (req: Request, res: Response): Promise<Response> => {
  const token: SessionReturn = await sessionServices.createToken(req.body);

  return res.status(200).json(token);
};

export default { login };

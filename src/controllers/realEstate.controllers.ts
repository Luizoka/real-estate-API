import { realEstateReturn } from '../interfaces';
import { realEstateServices } from '../services';
import { Request, Response } from 'express';

const createRealEstate = async (req: Request, res: Response): Promise<Response> => {
  const realEstate: realEstateReturn = await realEstateServices.createRealEstate(
    req.body
  );
  return res.status(201).json(realEstate);
};

export default { createRealEstate };

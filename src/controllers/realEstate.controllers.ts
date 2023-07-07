import { RealEstateRead, RealEstateReturn } from '../interfaces';
import { realEstateServices } from '../services';
import { Request, Response } from 'express';
import categoryServices from '../services/category.services';

const createRealEstate = async (req: Request, res: Response): Promise<Response> => {
  const { address, categoryId, ...payload } = req.body;
  res.locals = { ...res.locals, categoryId };

  const realEstate: RealEstateReturn = await realEstateServices.createRealEstate({
    address,
    categoryId,
    ...payload,
  });
  return res.status(201).json(realEstate);
};

const getAllRealEstates = async (req: Request, res: Response): Promise<Response> => {
  const allReadEstates: RealEstateRead = await realEstateServices.getAllRealEstates();

  return res.status(200).json(allReadEstates);
};
export default { createRealEstate, getAllRealEstates };

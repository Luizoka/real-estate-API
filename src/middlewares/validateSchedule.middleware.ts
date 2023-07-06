import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import {
  realEstateRepository,
  scheduleRepository,
  userRepository,
} from '../repositories';

const validateSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour, realEstateId } = req.body;

  const foundRealEstate = (await realEstateRepository.findOneBy({
    id: realEstateId,
  }))!;

  console.log('encontrou o realstate', foundRealEstate);

  const foundHour = (await scheduleRepository.findOneBy({
    hour: hour,
  }))!;

  console.log('Rencontrou a hora', foundHour);
  const foundDate = (await scheduleRepository.findOneBy({
    date: date,
  }))!;

  console.log('encontrou o dia', foundDate);

  const RealEstateExists = await scheduleRepository
    .createQueryBuilder('realEstate')
    .where('realEstate.id=:id', { id: foundRealEstate.id });

  console.log('encontrou o realstate com query', RealEstateExists);

  if (!foundRealEstate) throw new AppError('Real Estate not Found', 404);

  if (foundHour && foundDate && RealEstateExists) {
    console.log('tem um termin no mesmo dia na mesma hora e no mesmo local');
    throw new AppError('Real Estate not Found', 404);
  }

  console.log('valida date', date);
  console.log('valida hora', hour);

  console.log('valida relaestate', realEstateId);

  return next();
};

export { validateSchedule };

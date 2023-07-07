import { Address, RealEstate, Schedule } from '../entities';
import { AppError } from '../errors';
import {
  RealEstateOnlyReturn,
  RealEstateRepo,
  RealEstateReturn,
  RealEstateReturnFilterCategory,
  ScheduleCreate,
  ScheduleRead,
  ScheduleReturn,
  ScheduleByRealEstateReturn,
  ScheduleOnly,
  ScheduleRepo,
  UserReturn,
  UserCreate,
} from '../interfaces';
import {
  realEstateRepository,
  scheduleRepository,
  userRepository,
} from '../repositories';
import addressRepository from '../repositories/address.repository';
import {
  realEstateCreateSchema,
  realEstateOnlySchema,
  realEstateOnlyWithoutNameSchema,
  realEstateReturnFilterScheduleSchema,
  realEstateReturnSchema,
  realEstateSchema,
  scheduleReturnSchema,
  scheduleSchema,
  userReturnSchema,
} from '../schemas';

const createSchedule = async (
  userId: number,
  payload: ScheduleCreate
): Promise<ScheduleReturn> => {
  const { hour, date, realEstateId } = payload;
  const foundUser: UserCreate = (await userRepository.findOneBy({ id: userId }))!;
  const realEstate = (await realEstateRepository.findOneBy({
    id: payload.realEstateId,
  }))!;

  if (!realEstate) throw new AppError('RealEstate not found', 404);

  const scheduleTimeReapt = await scheduleRepository
    .createQueryBuilder('s')
    .leftJoinAndSelect('s.realEstate', 'r')
    .leftJoinAndSelect('s.user', 'u')
    .where('s.hour =:hour', { hour })
    .where('s.realEstateId =:realEstateId', { realEstateId })
    .andWhere('s.date =:date', { date })
    .getMany();

  if (scheduleTimeReapt.length > 0)
    throw new AppError(
      'Schedule to this real estate at this date and time already exists',
      409
    );

  const scheduleUserReapt = await scheduleRepository
    .createQueryBuilder('s')
    .leftJoinAndSelect('s.realEstate', 'r')
    .leftJoinAndSelect('s.user', 'u')
    .where('s.hour =:hour', { hour })
    .where('s.userId =:userId', { userId })
    .andWhere('s.date =:date', { date })
    .getMany();

  if (scheduleUserReapt.length > 0)
    throw new AppError(
      'User schedule to this real estate at this date and time already exists',
      409
    );

  const getHour = Number(hour.split(':')[0]);

  if (getHour < 8 || getHour > 18)
    throw new AppError('Invalid hour, available times are 8AM to 18PM', 400);

  const getDate = new Date(date).getDay();

  if (getDate === 0 || getDate === 6)
    throw new AppError('Invalid date, work days are monday to friday', 400);

  const schedule: Schedule = scheduleRepository.create({
    ...payload,
    user: foundUser,
    realEstate: realEstate,
  });

  const saveSchedule = await scheduleRepository.save({
    ...schedule,
    userId: userId,
    realEstateId: realEstate.id,
  });

  return saveSchedule;
};

const getAllSchedules = async (
  realEstateId: number
): Promise<ScheduleByRealEstateReturn> => {
  const getSchedules: RealEstate | null = await realEstateRepository
    .createQueryBuilder('r')
    .leftJoinAndSelect('r.schedules', 's')
    .where('r.id = :realEstateId', { realEstateId })
    .getOne();

  const getAddress: RealEstate | null = await realEstateRepository
    .createQueryBuilder('r')
    .leftJoinAndSelect('r.address', 'a')
    .where('r.id = :realEstateId', { realEstateId })
    .getOne();

  const getCategory: RealEstate | null = await realEstateRepository
    .createQueryBuilder('r')
    .leftJoinAndSelect('r.category', 'c')
    .where('r.id = :realEstateId', { realEstateId })
    .getOne();

  const getUser: Schedule[] | null = await scheduleRepository
    .createQueryBuilder('s')
    .leftJoinAndSelect('s.user', 'u')
    .where('s.realEstateId = :realEstateId', { realEstateId })
    .getMany();

  const address = getAddress?.address!;
  const category = getCategory?.category!;
  const createdAt = getSchedules?.createdAt!;
  const size = getSchedules?.size!;
  const sold = getSchedules?.sold!;
  const updatedAt = getSchedules?.updatedAt!;
  const value = getSchedules?.value!;
  const user = getUser;

  if (!getSchedules) throw new AppError('RealEstate not found', 404);

  const schedulesFinal = {
    id: realEstateId,
    size: size,
    sold: sold,
    value: value,
    updatedAt: updatedAt,
    createdAt: createdAt,
    address: address,
    category: category,
    schedules: getUser,
  };

  return schedulesFinal;
};

export default { createSchedule, getAllSchedules };

import { Schedule } from '../entities';
import { AppError } from '../errors';
import {
  RealEstateOnlyReturn,
  RealEstateRepo,
  RealEstateReturn,
  RealEstateReturnFilter,
  ScheduleCreate,
  ScheduleRead,
  ScheduleReturn,
  ScheduleRepo,
  UserReturn,
  UserCreate,
} from '../interfaces';
import {
  realEstateRepository,
  scheduleRepository,
  userRepository,
} from '../repositories';
import {
  realEstateCreateSchema,
  realEstateOnlySchema,
  realEstateOnlyWithoutNameSchema,
  realEstateReturnSchema,
  realEstateSchema,
  scheduleReturnSchema,
  scheduleSchema,
} from '../schemas';

const createSchedule = async (
  userId: number,
  payload: ScheduleCreate
): Promise<Schedule> => {
  const { hour, date, realEstateId } = payload;
  const foundUser: UserCreate = (await userRepository.findOneBy({ id: userId }))!;
  const foundRealEstate = (await realEstateRepository.findOneBy({
    id: payload.realEstateId,
  }))!;

  /*   console.log('encontrou o realstate', foundRealEstate);

  console.log('encontrou o usuario', foundUser); */

  const foundHour = (await scheduleRepository.findOneBy({
    hour: payload.hour,
  }))!;

  /*   console.log('Rencontrou a hora', foundHour); */
  const foundDate = (await scheduleRepository.findOneBy({
    date: payload.date,
  }))!;
  /* 
  console.log('encontrou o dia', foundDate); */

  if (!foundRealEstate) throw new AppError('RealEstate not found', 404);
  /* 
  const RealEstateExistsInToSchedule = await scheduleRepository
    .createQueryBuilder('realEstate')
    .getMany();
  console.log('encontrou o realstate com query', RealEstateExistsInToSchedule);
 */
  const verifySametime = await scheduleRepository
    .createQueryBuilder('scDate')
    .where('scDate.realEstateId = :realEstateId', { realEstateId })
    .where('scDate.hour = :hour', { hour })
    .andWhere('scDate.date = :date', { date })
    .getOne();

  /*  console.log('este horario ja esta ocupado', verifySametime); */

  if (verifySametime)
    throw new AppError(
      'Schedule to this real estate at this date and time already exists',
      409
    );
  const verifySameUserToSchedule = await scheduleRepository
    .createQueryBuilder('scUser')
    .where('scUser.userId = :userId', { userId })
    .where('scUser.hour = :hour', { hour })
    .andWhere('scUser.date = :date', { date })
    .getOne();

  console.log(
    'temos um usuario marcando dois termin no mesmo horario',
    verifySameUserToSchedule
  );

  if (verifySameUserToSchedule)
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
    realEstate: foundRealEstate,
  });

  console.log('esse é o meu create', schedule);

  const saveSchedule = await scheduleRepository.save({
    ...schedule,
    userId: userId,
    realEstateId: foundRealEstate.id,
  });

  console.log('esse é o meu salve', saveSchedule);

  const parse = scheduleReturnSchema.parse(saveSchedule);
  console.log('esse é o meu parse', parse);

  return saveSchedule;
};

const getAllSchedules = async () => {};

export default { createSchedule, getAllSchedules };

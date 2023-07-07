import { Category, Address, RealEstate } from '../entities';
import { AppError } from '../errors';
import {
  AddressCreate,
  AddressReturn,
  CategoryCreate,
  CategoryReturn,
  CategoryReturnName,
  RealEstateCreate,
  RealEstateRead,
  RealEstateReturn,
} from '../interfaces';
import { categoryRepository, realEstateRepository } from '../repositories';
import addressRepository from '../repositories/address.repository';
import {
  realEstateReadSchema,
  realEstateReturnSchema,
  realEstateSchema,
} from '../schemas';

const createRealEstate = async ({
  address,
  ...payload
}: RealEstateCreate): Promise<RealEstateReturn> => {
  const id = payload.categoryId;

  const foundCategory: CategoryReturn = (await categoryRepository.findOneBy({ id }))!;

  let finalCategory: CategoryReturnName;
  if (foundCategory) {
    finalCategory = foundCategory;
  } else {
    throw new AppError('Category not found', 400);
  }

  const searchStreet: string = address.street;
  const searchNumber: string | null = address.number!;
  const searchZipCode: string = address.zipCode;
  const searchState: string = address.state;
  const searchCity: string = address.city!;

  const foundAddressStreet = await addressRepository.findOneBy({
    street: searchStreet,
  });

  const foundAddressNumber = (await addressRepository.findOneBy({
    number: searchNumber,
  }))!;

  const foundAddressZipCode = await addressRepository.findOneBy({
    zipCode: searchZipCode,
  });

  const foundAddressState = await addressRepository.findOneBy({
    state: searchState,
  });

  const foundAddressCity = await addressRepository.findOneBy({
    city: searchCity,
  });

  if (
    foundAddressStreet &&
    foundAddressNumber &&
    foundAddressZipCode &&
    foundAddressState &&
    foundAddressCity
  ) {
    throw new AppError(`Address already exists`, 409);
  }

  const newAddress: AddressCreate = addressRepository.create(address);
  const finalAddress: AddressReturn = await addressRepository.save(newAddress);

  const realEstate: RealEstate = realEstateRepository.create({
    ...payload,
    address: finalAddress,
    category: foundCategory,
  });

  const realStateFinal = await realEstateRepository.save({
    ...realEstate,
    category: foundCategory,
    categoryId: foundCategory.id,
  });

  return realStateFinal;
};

const getAllRealEstates = async (): Promise<RealEstateRead> => {
  const allRealEstates: Array<RealEstate> = await realEstateRepository
    .createQueryBuilder('r')
    .leftJoinAndSelect('r.address', 'a')
    .getMany();

  return allRealEstates;
};

export default { createRealEstate, getAllRealEstates };

import { Category, Address, RealEstate } from '../entities';
import { AppError } from '../errors';
import {
  AddressCreate,
  AddressReturn,
  CategoryCreate,
  RealEstateCreate,
  RealEstateRead,
  realEstateReturn,
  RealEstateUpdade,
} from '../interfaces';
import { categoryRepository, realEstateRepository } from '../repositories';
import addressRepository from '../repositories/address.repository';
import { realEstateReturnSchema } from '../schemas';

const createRealEstate = async ({
  categoryToCreate,
  address,
  ...payload
}: RealEstateCreate): Promise<realEstateReturn> => {
  //! categoria
  const { name } = categoryToCreate;
  const foundCategory = (await categoryRepository.findOneBy({ name }))!;

  if (foundCategory) {
    throw new AppError(`Category alread Exist`, 400);
  }

  const newCategory: Category = categoryRepository.create(categoryToCreate);
  const finalCategory = await categoryRepository.save(newCategory);

  //! endereco
  const searchStreet: string = address.street;
  const searchNumber: string | null = address.number!;

  const foundAddressStreet = await addressRepository.findOneBy({
    street: searchStreet,
  });

  const foundAddressNumber = (await addressRepository.findOneBy({
    number: searchNumber,
  }))!;

  if (foundAddressStreet && foundAddressNumber) {
    throw new AppError(`Address alread Exist`, 400);
  }

  const newAddress: Address = addressRepository.create(address);
  const finalAddress = await addressRepository.save(newAddress);

  //! real state

  const realEstate: RealEstate = realEstateRepository.create({
    ...payload,
    address,
    category: finalCategory,
  });

  await realEstateRepository.save(realEstate);

  return realEstateReturnSchema.parse(realEstate);
};

export default { createRealEstate };

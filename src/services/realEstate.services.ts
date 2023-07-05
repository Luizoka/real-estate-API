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
  //! categoria
  const id = payload.categoryId;
  console.log('o id chegou no service', id);

  const foundCategory: CategoryReturn = (await categoryRepository.findOneBy({ id }))!;

  let finalCategory: CategoryReturnName;
  if (foundCategory) {
    finalCategory = foundCategory;
    console.log('encontrou a categoria', foundCategory);
  } else {
    throw new AppError('Category not found', 400);
  }

  //! endereco
  const searchStreet: string = address.street;
  const searchNumber: string | null = address.number!;
  const searchZipCode: string = address.zipCode;
  const searchState: string = address.state;
  const searchCity: string = address.city!;
  console.log('rua  do body', searchStreet);

  console.log('numero do body', searchNumber);

  const foundAddressStreet = await addressRepository.findOneBy({
    street: searchStreet,
  });
  console.log('encontrou a rua ', foundAddressStreet);

  const foundAddressNumber = (await addressRepository.findOneBy({
    number: searchNumber,
  }))!;
  console.log('encontrou o numero', foundAddressNumber);

  const foundAddressZipCode = await addressRepository.findOneBy({
    zipCode: searchZipCode,
  });
  console.log('encontrou o zipcode', foundAddressZipCode);

  const foundAddressState = await addressRepository.findOneBy({
    state: searchState,
  });
  console.log('encontrou o estado', foundAddressState);

  const foundAddressCity = await addressRepository.findOneBy({
    city: searchCity,
  });
  console.log('encontrou o cidade', foundAddressCity);

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

  //! real state

  const realEstate: RealEstate = realEstateRepository.create({
    ...payload,
    address: finalAddress,
    category: foundCategory,
  });

  console.log('esse deveria ser o retorno', realEstate);

  const realStateFinal = await realEstateRepository.save({
    ...realEstate,
    category: { name: finalCategory.name },
  });

  console.log('isso eu salvei', realStateFinal);

  const realEstateFinalReturn = realEstateReturnSchema.parse(realEstate);
  console.log('esse é o meu parse', realEstateFinalReturn);
  return realEstateFinalReturn;

  /*  console.log('agora vai', finalResult);

  return finalResult; */
};

const getAllRealEstates = async (): Promise<RealEstateRead> => {
  const allRealEstates: Array<RealEstate> = await realEstateRepository
    .createQueryBuilder('r')
    .leftJoinAndSelect('r.address', 'a')
    .leftJoinAndSelect('r.category', 'c')
    .getMany();

  console.log('get real estate ', allRealEstates);

  return realEstateReadSchema.parse(allRealEstates);
};

export default { createRealEstate, getAllRealEstates };

/* const createRealEstate = async ({
  categoryToCreate,
  address,
  ...payload
}: RealEstateCreate): Promise<realEstateReturn> => {
  //! categoria
  const { name } = categoryToCreate;

  const foundCategory = await categoryRepository.findOneBy({ name });
  console.log('encontrou a categoria', foundCategory);
  let finalCategory: Category;
  if (foundCategory) {
    finalCategory = foundCategory;
  } else {
    const newCategory: Category = categoryRepository.create(categoryToCreate);
    finalCategory = await categoryRepository.save(newCategory);
  }

  //! endereco
  const searchStreet: string = address.street;
  const searchNumber: string | null = address.number!;
  console.log('rua  do body', searchStreet);

  console.log('numero do body', searchNumber);

  const foundAddressStreet = await addressRepository.findOneBy({
    street: searchStreet,
  });
  console.log('encontrou a rua ', foundAddressStreet);

  const foundAddressNumber = (await addressRepository.findOneBy({
    number: searchNumber,
  }))!;
  console.log('encontrou o numero', foundCategory);

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
  console.log('esse deveria ser o retorno', realEstate);
  await realEstateRepository.save(realEstate);

  return realEstateReturnSchema.parse({
    realEstate,
    addressId: finalAddress.id,
    categoryId: finalCategory.id,
  });
}; */

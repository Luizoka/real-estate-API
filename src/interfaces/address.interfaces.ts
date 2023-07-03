import { z } from 'zod';
import { Repository, DeepPartial } from 'typeorm';
import { Address } from '../entities';

import { addressCreateSchema, addressReturnSchema } from '../schemas';

type AddressCreate = z.infer<typeof addressCreateSchema>;

type AddressReturn = z.infer<typeof addressReturnSchema>;

type AddressRepo = Repository<Address>;

type AddressUpdate = DeepPartial<Address>;

export { AddressCreate, AddressRepo, AddressUpdate, AddressReturn };

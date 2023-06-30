import { z } from 'zod';
import { Repository, DeepPartial } from 'typeorm';
import { Address } from '../entities';

import { addressCreateSchema } from '../schemas';

type AdressCreate = z.infer<typeof addressCreateSchema>;

type AddressRepo = Repository<Address>;

type AdressUpdate = DeepPartial<Address>;

export { AdressCreate, AddressRepo, AdressUpdate };

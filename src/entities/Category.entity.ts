import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RealEstate } from './RealEstate.entity';
/* import { RealEstateCategories } from './RealEstateCategories.entity'; */

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 45, unique: true })
  name: string;

  @OneToMany(() => RealEstate, (r) => r.category)
  realEstates: RealEstate[];
}

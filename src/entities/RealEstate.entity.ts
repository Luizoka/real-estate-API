import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './Address.entity';
import { Category } from './Category.entity';
import { Schedule } from './Schedule.entity';
/* import { RealEstateCategories } from './RealEstateCategories.entity'; */

@Entity('real_estate')
export class RealEstate {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'boolean', default: false })
  sold: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column({ type: 'int' })
  size: number;

  @CreateDateColumn({ type: 'date' })
  createdAt: string;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: string;

  //! ADRESS

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  /*   @ManyToOne(() => Address, (address) => address.realEstates)
  address: Address; */

  //! CATEGORIA
  @ManyToOne(() => Category, (c) => c.realEstates)
  category: Category;

  /*   @ManyToMany(() => Category)
  @JoinTable()
  category: Category; */

  //? SCHEDULE
  @OneToMany(() => Schedule, (s) => s.realEstate)
  schedules: Schedule;

  /*    @ManyToMany(() => Schedule)
  @JoinTable()
  schedules: Array<Schedule>; 
 */
  /*   @OneToMany(() => RealEstateCategories, (category) => category.realEstate)
  realEstateCategories: Array<RealEstateCategories>; */
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './Address.entity';
import { Category } from './Category.entity';
import { Schedule } from './Schedule.entity';

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
  createdAt: string | Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: string | Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, (c) => c.realEstates)
  category: Category;

  @OneToMany(() => Schedule, (s) => s.realEstate)
  schedules: Schedule[];
}

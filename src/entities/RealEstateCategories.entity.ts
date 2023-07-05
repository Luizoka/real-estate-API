/* import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RealEstate } from './RealEstate.entity';
import { Category } from './Category.entity';

@Entity('realEstates_categories')
export class RealEstateCategories {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.realEstateCategories)
  realEstate: RealEstate;

  @ManyToOne(() => Category, (realEstate) => realEstate.realEstateCategories)
  category: Category;
}
 */

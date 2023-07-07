import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RealEstate } from './RealEstate.entity';
import { User } from './User.entity';

@Entity('schedules')
export class Schedule {
  @BeforeInsert()
  changeDateFormat() {
    if (this.date) {
      let apointment = new Date(this.date),
        month = '' + (apointment.getMonth() + 1),
        day = '' + apointment.getDate(),
        year = apointment.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      this.date = [year, month, day].join('-');
    }
  }

  @BeforeInsert()
  changeTimeFormat() {
    if (this.hour) {
      const [hourNum, minNum] = this.hour.split(':');
      const time = new Date(0, 0, 0, Number(hourNum), Number(minNum));
      this.hour = `${time.getHours()}:${time.getMinutes()}`;
    }
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  hour: string;

  @ManyToOne(() => RealEstate, (r) => r.schedules)
  realEstate: RealEstate;

  @ManyToOne(() => User, (u) => u.schedule)
  user: User;
}

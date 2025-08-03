import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  gender: string;

  @Column()
  dob: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  specialty: string

  @Column()
  shift_start_time: string;

  @Column()
  shift_end_time: string;
}

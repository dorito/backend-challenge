import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Level } from './level';

export enum SexoEnum {
  MASCULINO = 'M',
  FEMININO = 'F',
  INTERSSEXO = 'I',
}

@Entity({ name: 'developer' })
export class Developer {
  @PrimaryGeneratedColumn()
  id!: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Level)
  @JoinColumn({ name: 'developerLevel' })
  level: Level;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: SexoEnum,
  })
  gender!: SexoEnum;

  @Column()
  birthday!: Date;

  @Column()
  age!: number;

  @Column()
  hobby!: string;
}

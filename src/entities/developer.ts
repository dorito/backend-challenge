import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Level } from './level';

export enum SexoEnum {
  MASCULINO = 'M',
  FEMININO = 'F',
  INTERSSEXO = 'I',
}

@Entity({ name: 'developer' })
export class Developer {
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Level)
  @JoinColumn({ name: 'developerLevel' })
  level: Level;

  @Expose()
  @Column()
  name!: string;

  @Expose()
  @Column({
    type: 'enum',
    enum: SexoEnum,
  })
  gender!: SexoEnum;

  @Expose()
  @Column()
  birthday!: Date;

  @Expose()
  @Column()
  age!: number;

  @Expose()
  @Column()
  hobby!: string;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;
}

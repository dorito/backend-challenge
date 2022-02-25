import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Level } from './level';
import { ApiProperty } from '@nestjs/swagger';

export enum SexoEnum {
  MASCULINO = 'M',
  FEMININO = 'F',
  INTERSSEXO = 'I',
}

@Entity({ name: 'developer' })
export class Developer {
  @ApiProperty()
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Expose()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Level)
  @JoinColumn({ name: 'developerLevel' })
  level: Level;

  @ApiProperty()
  @Expose()
  @Column()
  name!: string;

  @ApiProperty({
    enum: SexoEnum,
    description: 'M, F or I',
  })
  @Expose()
  @Column({
    type: 'enum',
    enum: SexoEnum,
  })
  gender!: SexoEnum;

  @ApiProperty()
  @Expose()
  @Column()
  birthday!: Date;

  @ApiProperty()
  @Expose()
  @Column()
  age!: number;

  @ApiProperty()
  @Expose()
  @Column()
  hobby!: string;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;
}

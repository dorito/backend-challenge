import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'level' })
export class Level {
  @ApiProperty()
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Expose()
  @Column()
  name!: string;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;
}

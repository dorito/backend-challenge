import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Expose } from 'class-transformer';
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
  level!: string;
}

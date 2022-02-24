import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'level' })
export class Level {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  level!: string;
}

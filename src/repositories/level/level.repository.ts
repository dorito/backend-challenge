import { Repository, EntityRepository } from 'typeorm';
import { Level } from '@/entities/level';

@EntityRepository(Level)
export class LevelRepository extends Repository<Level> {
  async findAll(): Promise<Level[]> {
    return this.find();
  }
}

import { Repository, EntityRepository } from 'typeorm';
import { Developer } from '@/entities/developer';

@EntityRepository(Developer)
export class DeveloperRepository extends Repository<Developer> {
  async findAll(): Promise<Developer[]> {
    return this.find();
  }

  async findById(id: number): Promise<Developer> {
    return this.findOne({ id });
  }

  async findByName(name: string): Promise<Developer> {
    return this.findOne({
      where: [{ name }],
    });
  }
}

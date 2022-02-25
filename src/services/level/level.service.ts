import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelRepository } from '@/repositories/level/level.repository';
import { Level } from '@/entities/level';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelRepository)
    private readonly levelRepository: LevelRepository,
  ) {}

  async findAll(): Promise<Level[]> {
    return this.levelRepository.findAll();
  }

  async findById(id: number): Promise<Level> {
    return this.levelRepository.findById(id);
  }
}

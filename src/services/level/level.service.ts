import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelRepository } from '@/repositories/level/level.repository';
import { Level } from '@/entities/level';
import { CreateLevelDto } from '@/dtos/level/create-level.dto';

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

  async createLevel(createLevelDto: CreateLevelDto): Promise<Level> {
    const levelName = createLevelDto.name;
    const existingLevel = await this.levelRepository.findByName(levelName);
    if (existingLevel) {
      throw new BadRequestException(
        `Level with name=${levelName} already exists (id=${existingLevel.id})`,
      );
    }
    const level = new Level();
    level.name = levelName;
    return this.levelRepository.save(level);
  }
}

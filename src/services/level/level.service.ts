import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const level: Level = await this.levelRepository.findById(id);
    if (!level) {
      throw new NotFoundException(`Level with id ${id} not found`);
    }
    return level;
  }

  async createLevel(createLevelDto: CreateLevelDto): Promise<Level> {
    const levelName: string = createLevelDto.name;
    const existingLevel: Level = await this.levelRepository.findByName(
      levelName,
    );
    if (existingLevel) {
      throw new BadRequestException(
        `Level with name=${levelName} already exists (id=${existingLevel.id})`,
      );
    }
    const level = new Level();
    level.name = levelName;
    return await this.levelRepository.save(level);
  }

  async removeLevel(id: number) {
    try {
      const level: Level = await this.findById(id);
      await this.levelRepository.softDelete(level);
    } catch (e) {
      throw e;
    }
  }
}

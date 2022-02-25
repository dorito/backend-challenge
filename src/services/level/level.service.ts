import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelRepository } from '@/repositories/level/level.repository';
import { Level } from '@/entities/level';
import { CreateLevelDto } from '@/dtos/level/create-level.dto';
import { EditLevelDto } from '@/dtos/level/edit-level-dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelRepository)
    private readonly levelRepository: LevelRepository,
  ) {}

  private async _findByName(name: string): Promise<Level> {
    return await this.levelRepository.findByName(name);
  }

  private async _abortIfAlreadyExists(levelName: string) {
    const itExists = (await this.levelRepository.findByName(levelName))
      ? true
      : false;
    if (itExists) {
      throw new BadRequestException(
        `Level with name=${levelName} already exists`,
      );
    }
  }

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
    await this._abortIfAlreadyExists(levelName);
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

  async editLevel(editLevelDto: EditLevelDto): Promise<Level> {
    try {
      const levelId: number = editLevelDto.id;
      const levelNewName: string = editLevelDto.name;
      const level = await this.findById(levelId);
      await this._abortIfAlreadyExists(levelNewName);
      level.name = levelNewName;
      return await this.levelRepository.save(level);
    } catch (e) {
      throw e;
    }
  }
}

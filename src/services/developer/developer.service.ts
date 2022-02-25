import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from '@/entities/developer';
import { DeveloperRepository } from '@/repositories/developer.repository';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(DeveloperRepository)
    private readonly developerRepository: DeveloperRepository,
  ) {}

  private async _findByName(name: string): Promise<Developer> {
    return await this.developerRepository.findByName(name);
  }

  private async _abortIfAlreadyExists(levelName: string) {
    const itExists = (await this.developerRepository.findByName(levelName))
      ? true
      : false;
    if (itExists) {
      throw new BadRequestException(
        `Level with name=${levelName} already exists`,
      );
    }
  }

  async findAll(): Promise<Developer[]> {
    return this.developerRepository.findAll();
  }

  async findById(id: number): Promise<Developer> {
    const developer: Developer = await this.developerRepository.findById(id);
    if (!developer) {
      throw new NotFoundException(`Developer with id ${id} not found`);
    }
    return developer;
  }

  async createDeveloper(/*createDeveloperDto: CreateLevelDto*/): Promise<Developer> {
    /*
    const levelName: string = createDeveloperDto.name;
    await this._abortIfAlreadyExists(levelName);
    const developer = new Developer();
    level.name = levelName;
    return await this.levelRepository.save(level);
    */
    return new Developer();
  }

  async removeLevel(id: number): Promise<boolean> {
    try {
      const developer: Developer = await this.findById(id);
      await this.developerRepository.softDelete(developer);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async editLevel(/*editDeveloperDto: EditDeveloperDto*/): Promise<Developer> {
    /*
    try {
      const levelId: number = editDeveloperDto.id;
      const levelNewName: string = editDeveloperDto.name;
      const level = await this.findById(levelId);
      await this._abortIfAlreadyExists(levelNewName);
      level.name = levelNewName;
      return await this.levelRepository.save(level);
    } catch (e) {
      throw e;
    }
    */
    return new Developer();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from '@/entities/developer';
import { DeveloperRepository } from '@/repositories/developer.repository';
import { CreateLevelDto } from '@/dtos/level/create-level.dto';
import { EditDeveloperDto } from '@/dtos/developer/edit-developer.dto';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(DeveloperRepository)
    private readonly developerRepository: DeveloperRepository,
  ) {}

  private async _findByName(name: string): Promise<Developer> {
    return await this.developerRepository.findByName(name);
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

  _populateFields(
    dto: CreateLevelDto | EditDeveloperDto,
    developer: Developer,
  ): Developer {
    Object.entries(dto).forEach(([key, value]) => {
      developer[key] = value;
    });
    return developer;
  }
  async createDeveloper(
    createDeveloperDto: CreateLevelDto,
  ): Promise<Developer> {
    const developer = new Developer();
    Object.entries(createDeveloperDto).forEach(([key, value]) => {
      developer[key] = value;
    });
    return await this.developerRepository.save(developer);
  }

  async removeDeveloper(id: number): Promise<boolean> {
    try {
      const developer: Developer = await this.findById(id);
      await this.developerRepository.softDelete(developer);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async editDeveloper(editDeveloperDto: EditDeveloperDto): Promise<Developer> {
    try {
      const developerId: number = editDeveloperDto.id;
      let developer = await this.findById(developerId);
      developer = this._populateFields(editDeveloperDto, developer);
      return await this.developerRepository.save(developer);
    } catch (e) {
      throw e;
    }
  }
}

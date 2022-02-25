import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from '@/entities/developer';
import { DeveloperRepository } from '@/repositories/developer.repository';
import { CreateLevelDto } from '@/validators/level/create-level.dto';
import { EditDeveloperDto } from '@/validators/developer/edit-developer.dto';
import { PaginatedResult } from '@/validators/common/paginated-result';
import { Like } from 'typeorm';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(DeveloperRepository)
    private readonly developerRepository: DeveloperRepository,
  ) {}

  private async _findByName(name: string): Promise<Developer> {
    return await this.developerRepository.findByName(name);
  }

  async findAll(
    take = 30,
    skip = 0,
    id?: number,
    name?: string,
    level?: number,
  ): Promise<PaginatedResult<Developer>> {
    const where = [];
    if (id) {
      where.push({
        id,
      });
    }
    if (name) {
      where.push({
        name: Like(`%${name}%`),
      });
    }
    if (level) {
      where.push({
        level,
      });
    }
    const [result, total] = await this.developerRepository.findAndCount({
      where,
      take,
      skip,
      relations: ['level'],
    });
    return {
      data: result,
      count: total,
    };
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

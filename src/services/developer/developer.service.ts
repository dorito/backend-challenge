import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from '@/entities/developer';
import { DeveloperRepository } from '@/repositories/developer.repository';
import { EditDeveloperDto } from '@/validators/developer/edit-developer.dto';
import { PaginatedResult } from '@/validators/common/paginated-result';
import { Like } from 'typeorm';
import { CreateDeveloperDto } from '@/validators/developer/create-developer.dto';

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

  _getAge(birthday: Date) {
    const today = new Date();
    let birthdayDate = birthday;
    if (typeof birthday == 'string') {
      birthdayDate = new Date(birthday);
    }
    let age = today.getFullYear() - birthdayDate.getFullYear();
    const m = today.getMonth() - birthdayDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
      age--;
    }
    return age;
  }

  _populateFields(
    dto: CreateDeveloperDto | EditDeveloperDto,
    developer: Developer,
  ): Developer {
    Object.entries(dto).forEach(([key, value]) => {
      developer[key] = value;
    });
    const age = this._getAge(dto.birthday);
    if (age <= 0) {
      throw new BadRequestException('Invalid birthday');
    }
    developer.age = age;
    return developer;
  }

  async createDeveloper(
    createDeveloperDto: CreateDeveloperDto,
  ): Promise<Developer> {
    try {
      const developer = this._populateFields(
        createDeveloperDto,
        new Developer(),
      );
      return await this.developerRepository.save(developer);
    } catch (e) {
      throw e;
    }
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

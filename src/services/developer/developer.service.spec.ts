import { Level } from '@/entities/level';
import { Developer, SexoEnum } from '@/entities/developer';
import { DeveloperRepository } from '@/repositories/developer.repository';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { DeveloperService } from './developer.service';

const oneLevel: Level = { id: 1, name: 'TestLevel 1' };
const twoLevel: Level = { id: 2, name: 'TestLevel 2' };
const oneDeveloper: Developer = {
  id: 1,
  level: oneLevel,
  name: 'TestDeveloper 1',
  birthday: new Date(2000, 1, 1),
  gender: SexoEnum.FEMININO,
  age: 22,
  hobby: 'a',
};
const twoDeveloper: Developer = {
  id: 2,
  level: twoLevel,
  name: 'TestDeveloper 2',
  birthday: new Date(2000, 1, 1),
  gender: SexoEnum.MASCULINO,
  age: 22,
  hobby: 'b',
};
const manyDevelopers = [oneDeveloper, twoDeveloper];

describe('DeveloperService', () => {
  let service: DeveloperService;
  const repoMock = {
    findAndCount: jest.fn(async (take?, skip?, id?) => {
      let resDevelopers = manyDevelopers.map((o) => plainToClass(Developer, o));
      if (id) {
        resDevelopers = [await repoMock.findById(id)];
      }
      return Promise.resolve([resDevelopers, manyDevelopers.length]);
    }),
    findById: jest.fn((id) => {
      const developerObj = manyDevelopers.filter((obj) => obj.id == id);
      if (developerObj) {
        return Promise.resolve(plainToClass(Developer, developerObj[0]));
      }
    }),
    findByName: jest.fn((name) => {
      const developerObj = manyDevelopers.filter((obj) => obj.name == name);
      if (developerObj) {
        return Promise.resolve(plainToClass(Developer, developerObj[0]));
      }
    }),
    save: jest.fn((obj) => Promise.resolve(plainToClass(Developer, obj))),
    softDelete: jest.fn((developer) => Promise.resolve(true)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperService,
        {
          provide: DeveloperRepository,
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<DeveloperService>(DeveloperService);
  });

  describe('findAll', () => {
    it('should return all developers', async () => {
      const result = await service.findAll();
      expect(result.data).toEqual(manyDevelopers);
    });
  });

  describe('findById', () => {
    it('should return developer with requested ID', async () => {
      const developer = await service.findById(oneDeveloper.id);
      expect(developer).toEqual(oneDeveloper);
    });

    it('should not return developer when developer with requested ID does not exist', async () => {
      expect(async () => {
        await service.findById(0);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('createDeveloper', () => {
    it('should create new developer', async () => {
      const createDeveloperDto = {
        name: 'Test',
        level: 1,
        gender: SexoEnum.INTERSSEXO,
        birthday: new Date(2000, 1, 1),
        hobby: 'x',
      };
      const createdDeveloper = await service.createDeveloper(
        createDeveloperDto,
      );
      expect(createDeveloperDto.name).toEqual(createdDeveloper.name);
    });
  });

  describe('removeDeveloper', () => {
    it('should delete developer that exists', async () => {
      const existingDeveloperId = oneDeveloper.id;
      const res = await service.removeDeveloper(existingDeveloperId);
      expect(res).toEqual(true);
    });

    it('should not delete developer that does not exists', async () => {
      expect(async () => {
        await service.removeDeveloper(0);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('editDeveloper', () => {
    it('should edit developer that exists', async () => {
      const editDeveloperDto = {
        id: 1,
        name: 'Test',
        level: 1,
        gender: SexoEnum.FEMININO,
        birthday: new Date(2000, 1, 1),
        hobby: 'x',
      };
      const developer = await service.editDeveloper(editDeveloperDto);
      expect(developer.name).toEqual(editDeveloperDto.name);
    });

    it('should not edit developer that does not exists', async () => {
      expect(async () => {
        const editDeveloperDto = {
          id: 1000,
          name: 'Test',
          level: 1,
          gender: SexoEnum.FEMININO,
          birthday: new Date(2000, 1, 1),
          hobby: 'x',
        };
        await service.editDeveloper(editDeveloperDto);
      }).rejects.toThrow(NotFoundException);
    });
  });
});

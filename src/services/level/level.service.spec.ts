import { Level } from '@/entities/level';
import { LevelRepository } from '@/repositories/level.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { LevelService } from './level.service';

const oneLevel: Level = { id: 1, name: 'TestLevel 1' };
const twoLevel: Level = { id: 2, name: 'TestLevel 2' };
const threeLevel: Level = { id: 3, name: 'TestLevel 3' };
const manyLevels = [oneLevel, twoLevel, threeLevel];

describe('LevelService', () => {
  let service: LevelService;
  const repoMock = {
    findAndCount: jest.fn((take?, skip?) =>
      Promise.resolve([
        manyLevels.map((o) => plainToClass(Level, o)),
        manyLevels.length,
      ]),
    ),
    findById: jest.fn((id) => {
      const levelObj = manyLevels.filter((obj) => obj.id == id);
      if (levelObj) {
        return Promise.resolve(plainToClass(Level, levelObj[0]));
      }
    }),
    findByName: jest.fn((name) => {
      const levelObj = manyLevels.filter((obj) => obj.name == name);
      if (levelObj) {
        return Promise.resolve(plainToClass(Level, levelObj[0]));
      }
    }),
    save: jest.fn((obj) => Promise.resolve(plainToClass(Level, obj))),
    softDelete: jest.fn((level) => Promise.resolve(true)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LevelService,
        {
          provide: LevelRepository,
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<LevelService>(LevelService);
  });

  describe('findAll', () => {
    it('should return all levels', async () => {
      const result = await service.findAll();
      expect(result.data).toEqual(manyLevels);
    });
  });

  describe('findById', () => {
    it('should return level with requested ID', async () => {
      const level = await service.findById(oneLevel.id);
      expect(level).toEqual(oneLevel);
    });

    it('should not return level when level with requested ID does not exist', async () => {
      expect(async () => {
        await service.findById(0);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('createLevel', () => {
    it('should create new level', async () => {
      const newLevel = { name: 'Test' };
      const createdLevel = await service.createLevel(newLevel);
      expect(newLevel.name).toEqual(createdLevel.name);
    });

    it('should not create new level when level with same name already exists', async () => {
      expect(async () => {
        const newLevel = oneLevel;
        await service.createLevel(newLevel);
      }).rejects.toThrow(BadRequestException);
    });
  });

  describe('removeLevel', () => {
    it('should delete level that exists', async () => {
      const existingLevelId = oneLevel.id;
      const res = await service.removeLevel(existingLevelId);
      expect(res).toEqual(true);
    });

    it('should not delete level that does not exists', async () => {
      expect(async () => {
        await service.removeLevel(0);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('editLevel', () => {
    it('should edit level that exists', async () => {
      const existingLevelId = oneLevel.id;
      const newName = 'New Name';
      const editNameDto = {
        id: existingLevelId,
        name: newName,
      };
      const level = await service.editLevel(editNameDto);
      expect(level.name).toEqual(editNameDto.name);
    });

    it('should not edit level that does not exists', async () => {
      expect(async () => {
        const editNameDto = {
          id: 0,
          name: 'test',
        };
        await service.editLevel(editNameDto);
      }).rejects.toThrow(NotFoundException);
    });
  });
});

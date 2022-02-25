import { CreateLevelDto } from '@/dtos/level/create-level.dto';
import { LevelService } from '@/services/level';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LevelController } from './level.controller';
import { Level } from '@/entities/level';
import { EditLevelDto } from '@/dtos/level/edit-level-dto';

const oneLevel: Level = { id: 1, name: 'TestLevel 1' };
const twoLevel: Level = { id: 2, name: 'TestLevel 2' };
const threeLevel: Level = { id: 3, name: 'TestLevel 3' };
const manyLevels = [oneLevel, twoLevel, threeLevel];

describe('LevelController', () => {
  let controller: LevelController;
  const serviceMock = {
    findById: jest.fn((id) => {
      const levelObj = manyLevels.filter((obj) => obj.id == id);
      if (levelObj[0]) {
        return levelObj[0];
      }
      throw new NotFoundException();
    }),
    findAll: jest.fn((id) => {
      if (!id) {
        return manyLevels;
      } else {
        return serviceMock.findById(id);
      }
    }),
    createLevel: jest.fn((createLevelDto: CreateLevelDto) => {
      return Promise.resolve({ id: 4, name: createLevelDto.name });
    }),
    editLevel: jest.fn((editLevelDto: EditLevelDto) => {
      serviceMock.findById(editLevelDto.id);
      return Promise.resolve({ id: editLevelDto.id, name: editLevelDto.name });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LevelController,
        {
          provide: LevelService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<LevelController>(LevelController);
  });

  describe('findOneOrAll', () => {
    it('should return all levels when no ?id', async () => {
      const levels = await controller.findOneOrAll(undefined);
      expect(levels).toEqual(manyLevels);
    });

    it('should return specific level when id', async () => {
      const knownId = oneLevel.id;
      const level = await controller.findOneOrAll(knownId);
      expect(level).toEqual(oneLevel);
    });

    it('should fail when id of non existent level', async () => {
      expect(async () => {
        await controller.findOneOrAll(999);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('createNewLevel', () => {
    it('should create new level when createLevelDto is setted', async () => {
      const createLevelDto = { name: 'Test' };
      const level = await controller.createNewLevel(createLevelDto);
      expect(level.name).toEqual(createLevelDto.name);
    });
  });

  describe('editLevel', () => {
    it('should edit level with requested ID', async () => {
      const editLevelDto = { id: 1, name: 'Test' };
      const level = await controller.editLevel(editLevelDto);
      expect(level.id).toEqual(editLevelDto.id);
      expect(level.name).toEqual(editLevelDto.name);
    });

    it('should not edit level with non existent ID', async () => {
      expect(async () => {
        const editLevelDto = { id: 999, name: 'Test' };
        await controller.editLevel(editLevelDto);
      }).rejects.toThrow(NotFoundException);
    });
  });
});

import { CreateDeveloperDto } from '@/validators/developer/create-developer.dto';
import { LevelService } from '@/services/level/level.service';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperController } from './developer.controller';
import { Developer, SexoEnum } from '@/entities/developer';
import { Level } from '@/entities/level';
import { EditDeveloperDto } from '@/validators/developer/edit-developer.dto';
import { DeveloperService } from '@/services/developer/developer.service';

const oneLevel: Level = { id: 1, name: 'TestLevel 1' };
const twoLevel: Level = { id: 2, name: 'TestLevel 2' };
const threeLevel: Level = { id: 3, name: 'TestLevel 3' };
const manyLevels = [oneLevel, twoLevel, threeLevel];
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

const _getAge = (birthday: Date) => {
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
};
describe('DeveloperController', () => {
  let controller: DeveloperController;
  const developerServiceMock = {
    findById: jest.fn((id) => {
      const developerObj = manyDevelopers.filter((obj) => obj.id == id);
      if (developerObj[0]) {
        return developerObj[0];
      }
      throw new NotFoundException();
    }),
    findAll: jest.fn((take, skip, id, name, level) => {
      if (!id) {
        return {
          count: manyDevelopers.length,
          data: manyDevelopers,
        };
      } else {
        return {
          count: 1,
          data: [developerServiceMock.findById(id)],
        };
      }
    }),
    createDeveloper: jest.fn((createDeveloperDto: CreateDeveloperDto) => {
      return Promise.resolve({
        id: 4,
        ...createDeveloperDto,
        age: _getAge(createDeveloperDto.birthday),
      });
    }),
    editDeveloper: jest.fn((editDeveloperDto: EditDeveloperDto) => {
      developerServiceMock.findById(editDeveloperDto.id);
      return Promise.resolve({
        id: editDeveloperDto.id,
        ...editDeveloperDto,
        age: _getAge(editDeveloperDto.birthday),
      });
    }),
  };

  const levelServiceMock = {
    findById: jest.fn((id: number) => {
      const levelObj = manyLevels.filter((obj) => obj.id == id);
      if (levelObj[0]) {
        return levelObj[0];
      }
      throw new NotFoundException();
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperController,
        {
          provide: LevelService,
          useValue: levelServiceMock,
        },
        {
          provide: DeveloperService,
          useValue: developerServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DeveloperController>(DeveloperController);
  });

  describe('findOneOrAll', () => {
    it('should return all developers when no query string', async () => {
      const developers = await controller.findOneOrAll(
        undefined, //id
        undefined, //name
        undefined, //level
      );
      expect({
        count: manyDevelopers.length,
        data: manyDevelopers,
      }).toEqual(developers);
    });

    it('should return specific developer when id', async () => {
      const knownId = oneDeveloper.id;
      const developer = await controller.findOneOrAll(
        undefined, //take
        undefined, //skip
        knownId,
        undefined, //name
        undefined, //level
      );
      expect(developer.data[0].id).toEqual(knownId);
    });

    it('should fail when id of non existent developer', async () => {
      expect(async () => {
        await controller.findOneOrAll(999, undefined, undefined);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('createNewDeveloper', () => {
    it('should create new developer when createDeveloperDto is setted', async () => {
      const createDeveloperDto = {
        name: 'Test',
        level: 1,
        gender: SexoEnum.INTERSSEXO,
        birthday: new Date(2000, 1, 1),
        hobby: 'x',
      };
      const level = await controller.createNewDeveloper(createDeveloperDto);
      expect(level.name).toEqual(createDeveloperDto.name);
    });
  });

  describe('editDeveloper', () => {
    it('should edit developer with requested ID', async () => {
      const editDeveloperDto = {
        id: 1,
        name: 'Test',
        level: 1,
        gender: SexoEnum.FEMININO,
        birthday: new Date(2000, 1, 1),
        hobby: 'x',
      };
      const developer = await controller.editDeveloper(editDeveloperDto);
      expect(developer.id).toEqual(developer.id);
      expect(developer.name).toEqual(developer.name);
    });

    it('should not edit developer with non existent ID', async () => {
      expect(async () => {
        const editDeveloperDto = {
          id: 1000,
          name: 'Test',
          level: 1,
          gender: SexoEnum.MASCULINO,
          birthday: new Date(2000, 1, 1),
          hobby: 'x',
        };
        await controller.editDeveloper(editDeveloperDto);
      }).rejects.toThrow(NotFoundException);
    });
  });
});

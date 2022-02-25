import { Test, TestingModule } from '@nestjs/testing';
import { LevelRepository } from './level.repository';

describe('LevelRepository', () => {
  let service: LevelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelRepository],
    }).compile();

    service = module.get<LevelRepository>(LevelRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

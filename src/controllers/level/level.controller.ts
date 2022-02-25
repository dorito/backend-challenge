import { Level } from '@/entities/level';
import { LevelService } from '@/services/level/level.service';
import { Controller, Get } from '@nestjs/common';

@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}
  @Get()
  async findAll(): Promise<Level[]> {
    return await this.levelService.findAll();
  }
}

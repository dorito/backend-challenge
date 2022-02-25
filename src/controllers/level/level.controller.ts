import { FindLevelByIdDto } from '@/dtos/level/find-level-by-id.dto';
import { Level } from '@/entities/level';
import { LevelService } from '@/services/level/level.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiQuery({
    name: 'id',
    type: Number,
    description: 'Level Id. Optional',
    required: false,
  })
  async findOneOrAll(
    @Query('id', new FindLevelByIdDto()) id: any,
  ): Promise<Level[] | Level> {
    if (!id) {
      return await this.levelService.findAll();
    }
    const level: Level = await this.levelService.findById(id);
    if (!level) {
      throw new HttpException(
        `Level with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return level;
  }
}

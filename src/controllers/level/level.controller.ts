import { CreateLevelDto } from '@/dtos/level/create-level.dto';
import { FindLevelByIdDto } from '@/dtos/level/find-level-by-id.dto';
import { Level } from '@/entities/level';
import { LevelService } from '@/services/level/level.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

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
  @ApiOkResponse({
    type: Level,
    isArray: true,
    description:
      'Return Level[] when ?id param is not setted.<br>Return Level when ?id param is setted.',
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiCreatedResponse({
    type: Level,
    description: 'Return Level when created is successfuly done.',
  })
  @ApiBody({
    type: CreateLevelDto,
    description: 'Name of new level',
  })
  async createNewLevel(@Body() createLevelDto: CreateLevelDto): Promise<Level> {
    return this.levelService.createLevel(createLevelDto);
  }
}

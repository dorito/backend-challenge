import { CreateLevelDto } from '@/dtos/level/create-level.dto';
import { FindLevelByIdDto } from '@/dtos/level/find-level-by-id.dto';
import { Level } from '@/entities/level';
import { LevelService } from '@/services/level/level.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOkResponse({
    type: Level,
    isArray: true,
    description:
      'Return Level[] when ?id param is not setted.<br>Return Level when ?id param is setted.',
  })
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
      return this.levelService.findAll();
    }
    return this.levelService.findById(id);
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete()
  @ApiNoContentResponse({
    type: Level,
    description: 'No return when successful.',
  })
  @ApiQuery({
    name: 'id',
    type: Number,
    description: 'Level Id',
    required: true,
  })
  async removeLevel(@Query('id', new FindLevelByIdDto()) id: any) {
    this.levelService.removeLevel(id);
  }
}

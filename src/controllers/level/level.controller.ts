import { CreateLevelDto } from '@/dtos/level/create-level.dto';
import { EditLevelDto } from '@/dtos/level/edit-level-dto';
import { NumericParam } from '@/dtos/common/numeric-param';
import { Level } from '@/entities/level';
import { LevelService } from '@/services/level/level.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Put,
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
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Level')
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
    @Query('id', new NumericParam()) id: any,
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
  async removeLevel(@Query('id', new NumericParam()) id: any) {
    await this.levelService.removeLevel(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  @ApiOkResponse({
    type: Level,
    description: 'Return Level when successful.',
  })
  @ApiBody({
    type: EditLevelDto,
    description: 'Id of level to be edited and the new chosen name.',
  })
  async editLevel(@Body() editLevelDto: EditLevelDto) {
    return await this.levelService.editLevel(editLevelDto);
  }
}

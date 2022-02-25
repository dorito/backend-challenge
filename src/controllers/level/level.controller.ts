import { CreateLevelDto } from '@/validators/level/create-level.dto';
import { EditLevelDto } from '@/validators/level/edit-level-dto';
import { NumericParam } from '@/validators/common/numeric-param';
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
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedResult } from '@/validators/common/paginated-result';

@ApiTags('Level')
@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiExtraModels(PaginatedResult, Level)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedResult) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Level) },
            },
            count: {
              type: 'number',
            },
          },
        },
      ],
    },
  })
  @ApiQuery({
    name: 'id',
    type: Number,
    description: 'Level Id. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    description: 'How many items to fetch. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    type: Number,
    description: 'How many items to skip. Optional',
    required: false,
  })
  async findOneOrAll(
    @Query('id', new NumericParam()) id: any,
    @Query('take', new NumericParam()) take?: any,
    @Query('skip', new NumericParam()) skip?: any,
  ): Promise<PaginatedResult<Level> | Level> {
    return this.levelService.findAll(take, skip, id);
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

import { NumericParam } from '@/validators/common/numeric-param';
import { CreateDeveloperDto } from '@/validators/developer/create-developer.dto';
import { EditDeveloperDto } from '@/validators/developer/edit-developer.dto';
import { Developer } from '@/entities/developer';
import { DeveloperService } from '@/services/developer/developer.service';
import { LevelService } from '@/services/level/level.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseInterceptors,
  NotFoundException,
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

@ApiTags('Developer')
@Controller('developer')
export class DeveloperController {
  constructor(
    private developerService: DeveloperService,
    private levelService: LevelService,
  ) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiExtraModels(PaginatedResult, Developer)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedResult) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Developer) },
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
    description: 'Developer Id. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'Developer name. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'level',
    type: Number,
    description: 'Developer level ID. Optional',
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
    @Query('name') name: string,
    @Query('level', new NumericParam()) level: any,
    @Query('take', new NumericParam()) take?: any,
    @Query('skip', new NumericParam()) skip?: any,
  ): Promise<PaginatedResult<Developer> | Developer> {
    const developers = await this.developerService.findAll(
      take,
      skip,
      id,
      name,
      level,
    );
    if (developers.count == 0) {
      throw new NotFoundException('No developers found');
    }
    return developers;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiCreatedResponse({
    type: Developer,
    description: 'Return Developer when created is successfuly done.',
  })
  @ApiBody({
    type: CreateDeveloperDto,
    description: 'New developer data',
  })
  async createNewDeveloper(
    @Body() createDeveloperDto: CreateDeveloperDto,
  ): Promise<Developer> {
    await this.levelService.findById(createDeveloperDto.level);
    return this.developerService.createDeveloper(createDeveloperDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete()
  @ApiNoContentResponse({
    description: 'No return when successful.',
  })
  @ApiQuery({
    name: 'id',
    type: Number,
    description: 'Developer Id',
    required: true,
  })
  async removeDeveloper(@Query('id', new NumericParam()) id: any) {
    await this.developerService.removeDeveloper(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  @ApiOkResponse({
    type: Developer,
    description: 'Return Developer when successful.',
  })
  @ApiBody({
    type: EditDeveloperDto,
    description: 'Data of developer to be edited.',
  })
  async editLevel(@Body() editDeveloperDto: EditDeveloperDto) {
    await this.levelService.findById(editDeveloperDto.level);
    return await this.developerService.editDeveloper(editDeveloperDto);
  }
}

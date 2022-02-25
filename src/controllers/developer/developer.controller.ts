import { NumericParam } from '@/dtos/common/numeric-param';
import { CreateDeveloperDto } from '@/dtos/developer/create-developer.dto';
import { EditDeveloperDto } from '@/dtos/developer/edit-developer.dto';
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
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Developer')
@Controller('developer')
export class DeveloperController {
  constructor(
    private developerService: DeveloperService,
    private levelService: LevelService,
  ) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOkResponse({
    type: Developer,
    isArray: true,
    description:
      'Return Developer[] when ?id param is not setted.<br>Return Developer when ?id param is setted.',
  })
  @ApiQuery({
    name: 'id',
    type: Number,
    description: 'Developer Id. Optional',
    required: false,
  })
  async findOneOrAll(
    @Query('id', new NumericParam()) id: any,
  ): Promise<Developer[] | Developer> {
    if (!id) {
      return this.developerService.findAll();
    }
    return this.developerService.findById(id);
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

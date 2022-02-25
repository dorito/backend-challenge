import { Developer } from '@/entities/developer';
import { DeveloperService } from '@/services/developer/developer.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Patch,
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

@Controller('developer')
export class DeveloperController {
  constructor(private developerService: DeveloperService) {}
  /*
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOkResponse({
    type: Developer,
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
    await this.levelService.removeLevel(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
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
  */
}

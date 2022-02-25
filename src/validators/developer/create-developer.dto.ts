import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  IsInt,
  IsDateString,
  IsISO8601,
} from 'class-validator';
import { SexoEnum } from '@/entities/developer';

export class CreateDeveloperDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  level: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(SexoEnum)
  @IsNotEmpty()
  @ApiProperty({
    enum: SexoEnum,
    description: 'M, F or I',
  })
  gender: SexoEnum;

  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty()
  birthday: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hobby: string;
}

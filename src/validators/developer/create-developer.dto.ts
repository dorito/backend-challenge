import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  IsInt,
  IsDateString,
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

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  birthday: Date;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hobby: string;
}

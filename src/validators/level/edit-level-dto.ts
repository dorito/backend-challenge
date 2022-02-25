import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class EditLevelDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

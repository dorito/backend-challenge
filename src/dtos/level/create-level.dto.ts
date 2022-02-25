import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

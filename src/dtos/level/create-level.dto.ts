import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

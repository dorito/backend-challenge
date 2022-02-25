import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelController } from '@/controllers/level/level.controller';
import { LevelService } from '@/services/level/level.service';
import { LevelRepository } from '@/repositories/level.repository';
import { DeveloperService } from '@/services/developer/developer.service';
import { DeveloperRepository } from '@/repositories/developer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LevelRepository]),
    TypeOrmModule.forFeature([DeveloperRepository]),
  ],
  controllers: [LevelController],
  providers: [LevelService, DeveloperService],
})
export class LevelModule {}

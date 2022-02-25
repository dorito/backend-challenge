import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperController } from '@/controllers/developer/developer.controller';
import { DeveloperService } from '@/services/developer/developer.service';
import { DeveloperRepository } from '@/repositories/developer.repository';
import { LevelService } from '@/services/level/level.service';
import { LevelRepository } from '@/repositories/level.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeveloperRepository]),
    TypeOrmModule.forFeature([LevelRepository]),
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService, LevelService],
})
export class DeveloperModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelController } from '@/controllers/level/level.controller';
import { LevelService } from '@/services/level/level.service';
import { LevelRepository } from '@/repositories/level/level.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LevelRepository])],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}

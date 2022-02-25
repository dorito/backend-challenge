import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperController } from '@/controllers/developer/developer.controller';
import { DeveloperService } from '@/services/developer/developer.service';
import { DeveloperRepository } from '@/repositories/developer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeveloperRepository])],
  controllers: [DeveloperController],
  providers: [DeveloperService],
})
export class DeveloperModule {}

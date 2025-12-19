import { Module } from '@nestjs/common';
import { LearningTaskService } from './learning-task.service';
import { LearningTaskController } from './learning-task.controller';

@Module({
  controllers: [LearningTaskController],
  providers: [LearningTaskService],
})
export class LearningTaskModule {}

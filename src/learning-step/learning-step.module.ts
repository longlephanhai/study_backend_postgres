import { Module } from '@nestjs/common';
import { LearningStepService } from './learning-step.service';
import { LearningStepController } from './learning-step.controller';

@Module({
  controllers: [LearningStepController],
  providers: [LearningStepService],
})
export class LearningStepModule {}

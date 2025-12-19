import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { LearningPath } from 'src/learning-path/entities/learning-path.entity';
import { LearningStep } from 'src/learning-step/entities/learning-step.entity';
import { UserTaskProgress } from 'src/user-task-progress/entities/user-task-progress.entity';
import { LearningTask } from 'src/learning-task/entities/learning-task.entity';
import { Part1Module } from 'src/part1/part1.module';
import { Part2Module } from 'src/part2/part2.module';
import { Part3Module } from 'src/part3/part3.module';
import { Part4Module } from 'src/part4/part4.module';
import { Part5Module } from 'src/part5/part5.module';
import { Part6Module } from 'src/part6/part6.module';
import { Part7Module } from 'src/part7/part7.module';
import { GrammarsModule } from 'src/grammars/grammars.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Survey, LearningPath, LearningStep, LearningTask, UserTaskProgress
  ]),
    Part1Module,
    Part2Module,
    Part3Module,
    Part4Module,
    Part5Module,
    Part6Module,
    Part7Module,
    GrammarsModule
  ],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule { }

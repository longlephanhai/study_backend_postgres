import { Module } from '@nestjs/common';
import { Part5MistakesService } from './part5-mistakes.service';
import { Part5MistakesController } from './part5-mistakes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResult } from 'src/exam-result/entities/exam-result.entity';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExamResult,
      Question
    ]),
  ],
  controllers: [Part5MistakesController],
  providers: [Part5MistakesService],
})
export class Part5MistakesModule { }

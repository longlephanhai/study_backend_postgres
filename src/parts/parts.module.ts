import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';
import { Question } from 'src/question/entities/question.entity';
import { Test } from '@nestjs/testing';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Part,
      Question,
      Test,
    ]),
  ],
  controllers: [PartsController],
  providers: [PartsService],
  exports: [PartsService],
})
export class PartsModule { }

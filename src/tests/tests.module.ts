import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Part } from 'src/parts/entities/part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Test,
      Part
    ]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule { }

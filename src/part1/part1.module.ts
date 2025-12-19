import { Module } from '@nestjs/common';
import { Part1Service } from './part1.service';
import { Part1Controller } from './part1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part1 } from './entities/part1.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Part1,
    ]),
  ],
  controllers: [Part1Controller],
  providers: [Part1Service],
  exports: [Part1Service],
})
export class Part1Module { }

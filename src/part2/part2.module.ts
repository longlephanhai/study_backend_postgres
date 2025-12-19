import { Module } from '@nestjs/common';
import { Part2Service } from './part2.service';
import { Part2Controller } from './part2.controller';
import { Part2 } from './entities/part2.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Part2,
    ]),
  ],
  controllers: [Part2Controller],
  providers: [Part2Service],
  exports: [Part2Service],
})
export class Part2Module { }

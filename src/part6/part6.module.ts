import { Module } from '@nestjs/common';
import { Part6Service } from './part6.service';
import { Part6Controller } from './part6.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part6 } from './entities/part6.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Part6,
    ]),
  ],
  controllers: [Part6Controller],
  providers: [Part6Service],
  exports: [Part6Service],
})
export class Part6Module { }

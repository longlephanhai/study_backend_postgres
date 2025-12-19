import { Module } from '@nestjs/common';
import { Part7Service } from './part7.service';
import { Part7Controller } from './part7.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part7 } from './entities/part7.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Part7,
    ]),
  ],
  controllers: [Part7Controller],
  providers: [Part7Service],
  exports: [Part7Service],
})
export class Part7Module { }

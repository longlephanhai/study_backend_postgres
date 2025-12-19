import { Module } from '@nestjs/common';
import { Part5Service } from './part5.service';
import { Part5Controller } from './part5.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part5 } from './entities/part5.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Part5,
    ]),
  ],
  controllers: [Part5Controller],
  providers: [Part5Service],
  exports: [Part5Service],
})
export class Part5Module { }

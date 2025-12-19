import { Module } from '@nestjs/common';
import { Part3Service } from './part3.service';
import { Part3Controller } from './part3.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part3 } from './entities/part3.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Part3,
    ]),
  ],
  controllers: [Part3Controller],
  providers: [Part3Service],
  exports: [Part3Service],
})
export class Part3Module { }

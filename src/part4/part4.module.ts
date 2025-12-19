import { Module } from '@nestjs/common';
import { Part4Service } from './part4.service';
import { Part4Controller } from './part4.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part4 } from './entities/part4.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Part4,
    ]),
  ],
  controllers: [Part4Controller],
  providers: [Part4Service],
  exports: [Part4Service],
})
export class Part4Module { }

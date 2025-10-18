import { Module } from '@nestjs/common';
import { GrammarsService } from './grammars.service';
import { GrammarsController } from './grammars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grammar } from './entities/grammar.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Grammar
    ]),
  ],
  controllers: [GrammarsController],
  providers: [GrammarsService],
})
export class GrammarsModule { }

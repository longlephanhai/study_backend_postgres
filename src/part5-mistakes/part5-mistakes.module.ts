import { Module } from '@nestjs/common';
import { Part5MistakesService } from './part5-mistakes.service';
import { Part5MistakesController } from './part5-mistakes.controller';

@Module({
  controllers: [Part5MistakesController],
  providers: [Part5MistakesService],
})
export class Part5MistakesModule {}

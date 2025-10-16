import { Module } from '@nestjs/common';
import { WritingAiService } from './writing-ai.service';
import { WritingAiController } from './writing-ai.controller';

@Module({
  controllers: [WritingAiController],
  providers: [WritingAiService],
})
export class WritingAiModule {}

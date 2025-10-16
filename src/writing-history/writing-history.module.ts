import { Module } from '@nestjs/common';
import { WritingHistoryService } from './writing-history.service';
import { WritingHistoryController } from './writing-history.controller';

@Module({
  controllers: [WritingHistoryController],
  providers: [WritingHistoryService],
})
export class WritingHistoryModule {}

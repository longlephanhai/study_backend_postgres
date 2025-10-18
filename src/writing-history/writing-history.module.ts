import { Module } from '@nestjs/common';
import { WritingHistoryService } from './writing-history.service';
import { WritingHistoryController } from './writing-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WritingHistory } from './entities/writing-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WritingHistory
    ]),
  ],
  controllers: [WritingHistoryController],
  providers: [WritingHistoryService],
})
export class WritingHistoryModule { }

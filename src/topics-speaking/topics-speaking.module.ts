import { Module } from '@nestjs/common';
import { TopicsSpeakingService } from './topics-speaking.service';
import { TopicsSpeakingController } from './topics-speaking.controller';

@Module({
  controllers: [TopicsSpeakingController],
  providers: [TopicsSpeakingService],
})
export class TopicsSpeakingModule {}

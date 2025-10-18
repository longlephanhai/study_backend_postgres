import { Module } from '@nestjs/common';
import { TopicsSpeakingService } from './topics-speaking.service';
import { TopicsSpeakingController } from './topics-speaking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsSpeaking } from './entities/topics-speaking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TopicsSpeaking
    ]),
  ],
  controllers: [TopicsSpeakingController],
  providers: [TopicsSpeakingService],
})
export class TopicsSpeakingModule { }

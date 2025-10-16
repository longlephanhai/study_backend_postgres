import { Module } from '@nestjs/common';
import { TopicsVocabulariesService } from './topics-vocabularies.service';
import { TopicsVocabulariesController } from './topics-vocabularies.controller';

@Module({
  controllers: [TopicsVocabulariesController],
  providers: [TopicsVocabulariesService],
})
export class TopicsVocabulariesModule {}

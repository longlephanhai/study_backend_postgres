import { Module } from '@nestjs/common';
import { TopicsVocabulariesService } from './topics-vocabularies.service';
import { TopicsVocabulariesController } from './topics-vocabularies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsVocabulary } from './entities/topics-vocabulary.entity';
import { Vocabulary } from 'src/vocabularies/entities/vocabulary.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TopicsVocabulary,
      Vocabulary
    ]),
  ],
  controllers: [TopicsVocabulariesController],
  providers: [TopicsVocabulariesService],
})
export class TopicsVocabulariesModule { }

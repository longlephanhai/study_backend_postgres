import { Injectable } from '@nestjs/common';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';

@Injectable()
export class VocabulariesService {
  create(createVocabularyDto: CreateVocabularyDto) {
    return 'This action adds a new vocabulary';
  }

  findAll() {
    return `This action returns all vocabularies`;
  }

  findOne(_id: number) {
    return `This action returns a #${_id} vocabulary`;
  }

  update(_id: number, updateVocabularyDto: UpdateVocabularyDto) {
    return `This action updates a #${_id} vocabulary`;
  }

  remove(_id: number) {
    return `This action removes a #${_id} vocabulary`;
  }
}

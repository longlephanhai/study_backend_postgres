import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  create(createQuestionDto: CreateQuestionDto) {
    return 'This action adds a new question';
  }

  findAll() {
    return `This action returns all question`;
  }

  findOne(_id: number) {
    return `This action returns a #${_id} question`;
  }

  update(_id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${_id} question`;
  }

  remove(_id: number) {
    return `This action removes a #${_id} question`;
  }
}

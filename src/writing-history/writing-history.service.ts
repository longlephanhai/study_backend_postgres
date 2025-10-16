import { Injectable } from '@nestjs/common';
import { CreateWritingHistoryDto } from './dto/create-writing-history.dto';
import { UpdateWritingHistoryDto } from './dto/update-writing-history.dto';

@Injectable()
export class WritingHistoryService {
  create(createWritingHistoryDto: CreateWritingHistoryDto) {
    return 'This action adds a new writingHistory';
  }

  findAll() {
    return `This action returns all writingHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} writingHistory`;
  }

  update(id: number, updateWritingHistoryDto: UpdateWritingHistoryDto) {
    return `This action updates a #${id} writingHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} writingHistory`;
  }
}

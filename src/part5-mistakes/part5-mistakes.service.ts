import { Injectable } from '@nestjs/common';
import { CreatePart5MistakeDto } from './dto/create-part5-mistake.dto';
import { UpdatePart5MistakeDto } from './dto/update-part5-mistake.dto';

@Injectable()
export class Part5MistakesService {
  create(createPart5MistakeDto: CreatePart5MistakeDto) {
    return 'This action adds a new part5Mistake';
  }

  findAll() {
    return `This action returns all part5Mistakes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} part5Mistake`;
  }

  update(id: number, updatePart5MistakeDto: UpdatePart5MistakeDto) {
    return `This action updates a #${id} part5Mistake`;
  }

  remove(id: number) {
    return `This action removes a #${id} part5Mistake`;
  }
}

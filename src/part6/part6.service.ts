import { Injectable } from '@nestjs/common';
import { CreatePart6Dto } from './dto/create-part6.dto';
import { UpdatePart6Dto } from './dto/update-part6.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part6 } from './entities/part6.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Part6Service {

  constructor(
    @InjectRepository(Part6) private part6Repository: Repository<Part6>,
  ) { }

  create(createPart6Dto: CreatePart6Dto) {
    return 'This action adds a new part6';
  }

  async createMultiple(createPart6Dtos: CreatePart6Dto[], user: IUser) {
    const newParts6 = await this.part6Repository.insert(
      createPart6Dtos.map(dto => ({
        ...dto,
        userId: user._id,
      })),
    );
    return newParts6;
  }

  async findAll() {
    return await this.part6Repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} part6`;
  }

  update(id: number, updatePart6Dto: UpdatePart6Dto) {
    return `This action updates a #${id} part6`;
  }

  remove(id: number) {
    return `This action removes a #${id} part6`;
  }
}

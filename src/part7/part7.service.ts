import { Injectable } from '@nestjs/common';
import { CreatePart7Dto } from './dto/create-part7.dto';
import { UpdatePart7Dto } from './dto/update-part7.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part7 } from './entities/part7.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Part7Service {

  constructor(
    @InjectRepository(Part7) private part7Repository: Repository<Part7>,
  ) { }

  create(createPart7Dto: CreatePart7Dto) {
    return 'This action adds a new part7';
  }

  async createMultiple(createPart7Dtos: CreatePart7Dto[], user: IUser) {
    const newParts7 = await this.part7Repository.insert(
      createPart7Dtos.map(dto => ({
        ...dto,
        userId: user._id,
      })),
    );
    return newParts7;
  }

  async findAll() {
    return await this.part7Repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} part7`;
  }

  update(id: number, updatePart7Dto: UpdatePart7Dto) {
    return `This action updates a #${id} part7`;
  }

  remove(id: number) {
    return `This action removes a #${id} part7`;
  }
}

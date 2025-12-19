import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePart4Dto } from './dto/create-part4.dto';
import { UpdatePart4Dto } from './dto/update-part4.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part4 } from './entities/part4.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Part4Service {

  constructor(
    @InjectRepository(Part4) private part4Repository: Repository<Part4>,
  ) { }

  create(createPart4Dto: CreatePart4Dto) {
    return 'This action adds a new part4';
  }

  async createMultiple(createPart4Dtos: CreatePart4Dto[], user: IUser) {
    const audioUrl = await this.part4Repository.find();
    const isExist = audioUrl.some(item =>
      createPart4Dtos.some(dto => dto.audioUrl === item.audioUrl),
    );
    if (isExist) {
      throw new BadRequestException('Question already exists');
    }
    const newParts4 = await this.part4Repository.insert(
      createPart4Dtos.map(dto => ({
        ...dto,
        userId: user._id,
      })),
    );
    return newParts4;
  }

  async findAll() {
    return await this.part4Repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} part4`;
  }

  update(id: number, updatePart4Dto: UpdatePart4Dto) {
    return `This action updates a #${id} part4`;
  }

  remove(id: number) {
    return `This action removes a #${id} part4`;
  }
}

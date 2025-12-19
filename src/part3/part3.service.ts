import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePart3Dto } from './dto/create-part3.dto';
import { UpdatePart3Dto } from './dto/update-part3.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part3 } from './entities/part3.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Part3Service {

  constructor(
    @InjectRepository(Part3) private part3Repository: Repository<Part3>,
  ) { }

  create(createPart3Dto: CreatePart3Dto) {
    return 'This action adds a new part3';
  }

  async createMultiple(createPart3Dtos: CreatePart3Dto[], user: IUser) {
    const audioUrl = await this.part3Repository.find();
    const isExist = audioUrl.some(item =>
      createPart3Dtos.some(dto => dto.audioUrl === item.audioUrl),
    );
    if (isExist) {
      throw new BadRequestException('Question already exists');
    }
    const newParts3 = await this.part3Repository.insert(
      createPart3Dtos.map(dto => ({
        ...dto,
        userId: user._id,
      })),
    );
    return newParts3;
  }

  async findAll() {
    return await this.part3Repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} part3`;
  }

  update(id: number, updatePart3Dto: UpdatePart3Dto) {
    return `This action updates a #${id} part3`;
  }

  remove(id: number) {
    return `This action removes a #${id} part3`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePart5Dto } from './dto/create-part5.dto';
import { UpdatePart5Dto } from './dto/update-part5.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part5 } from './entities/part5.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class Part5Service {

  constructor(
    @InjectRepository(Part5) private part5Repository: Repository<Part5>,
  ) { }

  create(createPart5Dto: CreatePart5Dto) {
    return 'This action adds a new part5';
  }

  async createMultiple(createPart5Dtos: CreatePart5Dto[], user: IUser) {
    const isExist = await this.part5Repository.find({
      where: { questionContent: In(createPart5Dtos.map(dto => dto.questionContent)) },
    });
    if (isExist.length > 0) {
      throw new BadRequestException('Question already exists');
    }
    const newParts5 = await this.part5Repository.insert(
      createPart5Dtos.map(dto => ({
        ...dto,
        userId: user._id,
      })),
    );
    return newParts5;
  }

  async findAll() {
    return await this.part5Repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} part5`;
  }

  update(id: number, updatePart5Dto: UpdatePart5Dto) {
    return `This action updates a #${id} part5`;
  }

  remove(id: number) {
    return `This action removes a #${id} part5`;
  }
}

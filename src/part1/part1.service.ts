import { Injectable } from '@nestjs/common';
import { CreatePart1Dto } from './dto/create-part1.dto';
import { UpdatePart1Dto } from './dto/update-part1.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part1 } from './entities/part1.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class Part1Service {

  constructor(
    @InjectRepository(Part1) private part1Repository: Repository<Part1>,
  ) { }

  create(createPart1Dto: CreatePart1Dto) {
    return 'This action adds a new part1';
  }

  async createMultiple(createPart1Dtos: CreatePart1Dto[], user: IUser) {
    const imgUrl = createPart1Dtos.map(dto => dto.imageUrl);
    const isExist = await this.part1Repository.find({
      where: {
        imageUrl: In(imgUrl),
      }
    });

    if (isExist.length > 0) {
      throw new Error('Part1 with the same imageUrl already exists for this user.');
    }

    const newParts1 = await this.part1Repository.insert(
      createPart1Dtos.map(dto => ({
        ...dto,
        userId: user._id,
      })),
    );
    return newParts1;
  }

  async findAll() {
    return await this.part1Repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} part1`;
  }

  update(id: number, updatePart1Dto: UpdatePart1Dto) {
    return `This action updates a #${id} part1`;
  }

  remove(id: number) {
    return `This action removes a #${id} part1`;
  }
}

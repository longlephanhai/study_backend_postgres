import { Injectable } from '@nestjs/common';
import { CreatePart2Dto } from './dto/create-part2.dto';
import { UpdatePart2Dto } from './dto/update-part2.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part2 } from './entities/part2.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class Part2Service {

  constructor(
    @InjectRepository(Part2) private part2Repository: Repository<Part2>,
  ) { }

  create(createPart2Dto: CreatePart2Dto) {
    return 'This action adds a new part2';
  }

  async createMultiple(createPart2Dtos: CreatePart2Dto[], user: IUser) {
    const audioUrls = createPart2Dtos.map(dto => dto.audioUrl);
    const isExist = await this.part2Repository.find({
      where: {
        audioUrl: In(audioUrls),
      }
    });

    if (isExist.length > 0) {
      throw new Error('Part2 with the same audioUrl already exists for this user.');
    }

    const newParts2 = await this.part2Repository.insert(
      createPart2Dtos.map(dto => ({
        ...dto,
        userId: user._id,
      })),
    );
    return newParts2;
  }

  async findAll() {
    return await this.part2Repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} part2`;
  }

  update(id: number, updatePart2Dto: UpdatePart2Dto) {
    return `This action updates a #${id} part2`;
  }

  remove(id: number) {
    return `This action removes a #${id} part2`;
  }
}

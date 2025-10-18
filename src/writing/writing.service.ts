import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWritingDto } from './dto/create-writing.dto';
import { UpdateWritingDto } from './dto/update-writing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Writing } from './entities/writing.entity';
import { Repository } from 'typeorm';
import aqp from 'api-query-params';

@Injectable()
export class WritingService {

  constructor(
    @InjectRepository(Writing) private writingRepository: Repository<Writing>,
  ) { }

  create(createWritingDto: CreateWritingDto) {
    return 'This action adds a new writing';
  }

  async createMultiple(createWritingDto: CreateWritingDto[]) {
    const isExist = await this.writingRepository.findOne(
      { where: { title: createWritingDto[0].title } }
    );
    if (isExist) {
      throw new BadRequestException('Title already exists');
    }
    return this.writingRepository.save(createWritingDto);
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const page = +currentPage > 0 ? +currentPage : 1;
    const take = +limit ? +limit : 10;
    const skip = (page - 1) * take;

    // convert sort from api-query-params format (1/-1) to TypeORM order format ('ASC'/'DESC')
    let order: Record<string, 'ASC' | 'DESC'> | undefined = undefined;
    if (sort && typeof sort === 'object') {
      order = Object.fromEntries(
        Object.entries(sort as Record<string, number>).map(([k, v]) => [k, v === -1 ? 'DESC' : 'ASC'])
      ) as Record<string, 'ASC' | 'DESC'>;
    }

    // convert population to relations array if requested
    let relations: string[] | undefined = undefined;
    if (population) {
      if (Array.isArray(population)) {
        relations = population as unknown as string[];
      } else if (typeof population === 'string') {
        relations = [population];
      } else if (typeof population === 'object') {
        relations = Object.keys(population);
      }
    }

    // Use findAndCount for pagination metadata
    const [items, totalItems] = await this.writingRepository.findAndCount({
      where: filter as any,
      skip,
      take,
      order,
      relations,
    });

    const totalPages = Math.ceil(totalItems / take);

    // remove password field before returning
    const result = items.map((u) => {
      const userObj = { ...(u as any) };
      delete userObj.password;
      return userObj;
    });

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  async findOne(_id: string) {
    return await this.writingRepository.findOne({ where: { _id } });
  }

  update(_id: number, updateWritingDto: UpdateWritingDto) {
    return `This action updates a #${_id} writing`;
  }

  remove(_id: number) {
    return `This action removes a #${_id} writing`;
  }
}

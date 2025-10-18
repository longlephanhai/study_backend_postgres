import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { In, Repository } from 'typeorm';
import { Part } from 'src/parts/entities/part.entity';
import { CreatePartDto } from 'src/parts/dto/create-part.dto';
import aqp from 'api-query-params';


@Injectable()
export class TestsService {

  constructor(
    @InjectRepository(Test) private testRepository: Repository<Test>,
    @InjectRepository(Part) private partRepository: Repository<Part>,
  ) { }

  async create(createTestDto: CreateTestDto, user: IUser) {
    const isExist = await this.testRepository.findOne({
      where: {
        title: createTestDto.title,
      },
    })
    if (isExist) {
      throw new BadRequestException('Test with this title is already exist')
    }
    const newTest = await this.testRepository.save({
      ...createTestDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      }
    })
    return newTest;
  }

  async createMultiple(createTestDto: CreateTestDto[], user: IUser) {
    const titles = createTestDto.map(test => test.title);
    const isExist = await this.testRepository.find({
      where: { title: In(titles) }
    });
    if (isExist.length) {
      const existTitles = isExist.map(test => test.title);
      throw new BadRequestException(`Tests with these titles are already exist: ${existTitles.join(', ')}`);
    }
    const newTests = await this.testRepository.save(
      createTestDto.map(test => ({
        ...test,
        createdBy: {
          _id: user._id,
          email: user.email,
        }
      }))
    );
    return newTests;
  }

  async createPart(testId: string, createPartDto: CreatePartDto, user: IUser) {
    const test = await this.testRepository.findOne({ where: { _id: testId } });
    if (!test) {
      throw new BadRequestException('Test not found');
    }
    const newPart = await this.partRepository.save({
      ...createPartDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      }
    });
    await this.testRepository.update(test._id, {
      parts: [...(test.parts || []), newPart],
    })
    return newPart;
  }

  async createMultipleParts(testId: string, createPartDto: CreatePartDto[], user: IUser) {
    const test = await this.testRepository.findOne({
      where: { _id: testId },
      relations: ['parts'],
    });

    if (!test) {
      throw new BadRequestException('Test not found');
    }

    // Kiểm tra parts đã tồn tại
    const existingParts = await this.partRepository.find({
      where: {
        partNo: In(createPartDto.map(part => part.partNo)),
        _id: In((test.parts || []).map(p => (typeof p === 'object' ? (p as any)._id : p))),
      },
    });

    if (existingParts.length) {
      const existPartNos = existingParts.map(part => part.partNo);
      throw new BadRequestException(
        `Parts with these part numbers already exist in this test: ${existPartNos.join(', ')}`,
      );
    }


    const newParts = await this.partRepository.save(
      createPartDto.map(part => ({
        ...part,
        createdBy: { _id: user._id, email: user.email },
      })),
    );

    test.parts = [...(test.parts || []), ...newParts];
    await this.testRepository.save(test);

    return newParts;
  }


  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs) as any;
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
    const [items, totalItems] = await this.testRepository.findAndCount({
      where: filter as any,
      skip,
      take,
      order,
      relations: ['parts'],
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
    return await this.testRepository.findOne(
      {
        where: { _id },
        relations: ['parts'],
      }
    );
  }

  update(_id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${_id} test`;
  }

  remove(_id: number) {
    return `This action removes a #${_id} test`;
  }
}

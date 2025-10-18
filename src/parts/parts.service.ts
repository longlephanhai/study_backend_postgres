import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';
import { Repository, In } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';
import { Test } from '@nestjs/testing';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';
import aqp from 'api-query-params';
import { StartTestDTO } from './parts.controller';

@Injectable()
export class PartsService {

  constructor(
    @InjectRepository(Part) private partRepository: Repository<Part>,
    @InjectRepository(Question) private questionRepository: Repository<Question>,
    @InjectRepository(Test) private testRepository: Repository<Test>,
  ) { }

  create(createPartDto: CreatePartDto) {
    return 'This action adds a new part';
  }

  async createQuestion(id: string, createQuestionDTO: CreateQuestionDto, user: IUser) {
    const part = await this.partRepository.findOne({
      where: { id },
    })
    if (!part) {
      throw new BadRequestException('Part not found');
    }
    const newQuestion = await this.questionRepository.create({
      ...createQuestionDTO,
      createdBy: {
        _id: user.id,
        email: user.email,
      }
    })
    await this.partRepository.update(part.id, {
      questions: [...(part.questions || []), newQuestion],
    })
    return newQuestion;
  }

  async createMultipleQuestions(id: string, createQuestionDTO: CreateQuestionDto[], user: IUser) {
    const part = await this.partRepository.findOne({
      where: { id },
    })
    if (!part) {
      throw new BadRequestException('Part not found');
    }
    const questions = await this.questionRepository.find({
      where: {
        numberQuestion: In(createQuestionDTO.map(q => q.numberQuestion)),
        id: In(part.questions)
      }
    })

    if (questions.length) {
      const existNumbers = questions.map(q => q.numberQuestion);
      throw new BadRequestException(`Questions with these numbers are already exist: ${existNumbers.join(', ')}`);
    }

    const newQuestions = await this.questionRepository.save(
      createQuestionDTO.map(q => ({
        ...q,
        createdBy: {
          _id: user.id,
          email: user.email,
        }
      }))
    )
    await this.partRepository.update(part.id, {
      questions: [...(part.questions || []), ...newQuestions],
    })
    return newQuestions;
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
    const [items, totalItems] = await this.partRepository.findAndCount({
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

  async findAllToStart(startTestDTO: StartTestDTO) {
    const parts = await this.partRepository.find({
      where: {
        id: In(startTestDTO.partIds)
      },
      relations: ['questions']
    });
    return parts;
  }

  findOne(id: number) {
    return `This action returns a #${id} part`;
  }

  update(id: number, updatePartDto: UpdatePartDto) {
    return `This action updates a #${id} part`;
  }

  remove(id: number) {
    return `This action removes a #${id} part`;
  }
}

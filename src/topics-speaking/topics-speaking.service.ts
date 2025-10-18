import { Injectable } from '@nestjs/common';
import { CreateTopicsSpeakingDto } from './dto/create-topics-speaking.dto';
import { UpdateTopicsSpeakingDto } from './dto/update-topics-speaking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicsSpeaking } from './entities/topics-speaking.entity';
import aqp from 'api-query-params';

@Injectable()
export class TopicsSpeakingService {

  constructor(
    @InjectRepository(TopicsSpeaking) private topicsSpeakingRepository: Repository<TopicsSpeaking>,
  ) { }

  create(createTopicsSpeakingDto: CreateTopicsSpeakingDto) {
    return 'This action adds a new topicsSpeaking';
  }

  async createMultiple(createTopicsSpeakingDtos: CreateTopicsSpeakingDto[]) {
    const createdTopics = await this.topicsSpeakingRepository.save(createTopicsSpeakingDtos);
    return createdTopics;
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
    const [items, totalItems] = await this.topicsSpeakingRepository.findAndCount({
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

  findOne(id: number) {
    return `This action returns a #${id} topicsSpeaking`;
  }

  update(id: number, updateTopicsSpeakingDto: UpdateTopicsSpeakingDto) {
    return `This action updates a #${id} topicsSpeaking`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicsSpeaking`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTopicsVocabularyDto } from './dto/create-topics-vocabulary.dto';
import { UpdateTopicsVocabularyDto } from './dto/update-topics-vocabulary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicsVocabulary } from './entities/topics-vocabulary.entity';
import { Vocabulary } from 'src/vocabularies/entities/vocabulary.entity';
import { Repository, In } from 'typeorm';
import { CreateVocabularyDto } from 'src/vocabularies/dto/create-vocabulary.dto';
import aqp from 'api-query-params';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TopicsVocabulariesService {
  private genAI: GoogleGenerativeAI;
  private genAiProModel: any;
  private readonly batchSize = 5;
  constructor(
    @InjectRepository(TopicsVocabulary) private topicsVocabularyRepository: Repository<TopicsVocabulary>,
    @InjectRepository(Vocabulary) private vocabularyRepository: Repository<Vocabulary>,
    private configService: ConfigService
  ) {
    this.genAI = new GoogleGenerativeAI(this.configService.get<string>('API_GEMINI_KEY')!);
    this.genAiProModel = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  }

  create(createTopicsVocabularyDto: CreateTopicsVocabularyDto) {
    return 'This action adds a new topicsVocabulary';
  }

  async createMultiple(createTopicsVocabularyDtos: CreateTopicsVocabularyDto[]) {
    const payloads = createTopicsVocabularyDtos.map(dto => ({
      ...dto,
      vocabularies: (dto.vocabularies || []).map(v => ({ _id: v })),
    }));
    return await this.topicsVocabularyRepository.save(payloads);
  }

  async createMultipleVocabulary(_id: string, createVocabularyDto: CreateVocabularyDto[], user: IUser) {
    const topicsVocabulary = await this.topicsVocabularyRepository.findOne({ where: { _id: _id } });
    if (!topicsVocabulary) {
      throw new BadRequestException('TopicsVocabulary not found');
    }
    const vocabularies = await this.vocabularyRepository.find({
      where: {
        vocab: In(createVocabularyDto.map(v => v.vocab)),
        _id: topicsVocabulary._id,
      }
    })
    if (vocabularies.length) {
      const existVocabularies = vocabularies.map(v => v.vocab);
      throw new BadRequestException(`Vocabularies with these vocabs are already exist: ${existVocabularies.join(', ')}`);
    }

    const newVocabularies = await this.vocabularyRepository.save(
      createVocabularyDto.map(v => ({
        ...v,
        topicsVocabulary: topicsVocabulary._id,
        createdBy: {
          _id: user._id,
          email: user.email,
        }
      }))
    );
    await this.topicsVocabularyRepository.update(topicsVocabulary._id, {
      vocabularies: [...(topicsVocabulary.vocabularies || []), ...newVocabularies],
    })
    return newVocabularies;
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
    const [items, totalItems] = await this.topicsVocabularyRepository.findAndCount({
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
    return await this.topicsVocabularyRepository.findOne({
      where: { _id: _id },
      relations: ['vocabularies']
    });
  }

  async getVocabulariesFromAI(_id: string, maxWords = 20) {
    const topicsVocabulary = await this.topicsVocabularyRepository.findOne({
      where: { _id: _id },
      relations: ['vocabularies']
    });
    if (!topicsVocabulary) {
      throw new BadRequestException('TopicsVocabulary not found');
    }

    const vocabularies = topicsVocabulary.vocabularies as Vocabulary[];
    if (!vocabularies.length) return [];

    const limitedVocab = vocabularies.slice(0, maxWords);

    const prompt = `
Bạn là trợ lý luyện TOEIC thông minh. Hãy giúp người học ôn tập các từ sau:
${limitedVocab.map(v => `- ${v.vocab} (${v.meaning}): ${v.example}`).join('\n')}

Sinh cho từng từ dạng bài tập:
Điền vào chỗ trống (blank) trong câu. Trả về JSON có cấu trúc:
[
  {
    "word": "desk",
    "fillBlank": {
      "question": "...", 
      "answer": "..."
    }
  }
]

Chỉ trả JSON, không thêm text khác.
`;

    try {
      const result = await this.genAiProModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const rawText = result.response.text();
      const jsonStart = rawText.indexOf('[');
      const jsonEnd = rawText.lastIndexOf(']');
      const jsonString = jsonStart !== -1 && jsonEnd !== -1 ? rawText.slice(jsonStart, jsonEnd + 1) : rawText;

      try {
        return JSON.parse(jsonString);
      } catch {
        console.warn('⚠️ AI output not valid JSON, returning raw text.');
        return [{ rawText }];
      }
    } catch (error) {
      console.error('❌ Error calling Gemini AI:', error);
      return [{ rawText: 'Error calling AI, please try again later.' }];
    }
  }

  update(_id: number, updateTopicsVocabularyDto: UpdateTopicsVocabularyDto) {
    return `This action updates a #${_id} topicsVocabulary`;
  }

  remove(_id: number) {
    return `This action removes a #${_id} topicsVocabulary`;
  }
}

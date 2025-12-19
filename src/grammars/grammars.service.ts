import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGrammarDto } from './dto/create-grammar.dto';
import { UpdateGrammarDto } from './dto/update-grammar.dto';
import aqp from 'api-query-params';
import { InjectRepository } from '@nestjs/typeorm';
import { Grammar } from './entities/grammar.entity';
import { In, Repository } from 'typeorm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GrammarsService {
  private genAI: GoogleGenerativeAI;
  private genAiProModel: any;
  constructor(
    @InjectRepository(Grammar) private grammarRepository: Repository<Grammar>,
    private configService: ConfigService
  ) {
    this.genAI = new GoogleGenerativeAI(this.configService.get<string>('API_GEMINI_KEY')!);
    this.genAiProModel = this.genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
  }

  create(createGrammarDto: CreateGrammarDto) {
    return 'This action adds a new grammar';
  }

  async createMultiple(createGrammarDtos: CreateGrammarDto[], user: IUser) {
    const titles = createGrammarDtos.map(dto => dto.title);
    const isExist = await this.grammarRepository.find({
      where: { title: In(titles) }
    })
    if (isExist.length > 0) {
      const existTitles = isExist.map(g => g.title);
      throw new BadRequestException(`Grammars with titles [${existTitles.join(", ")}] already exist.`);
    }
    const newGrammars = await this.grammarRepository.save(
      createGrammarDtos.map(dto => ({
        ...dto,
        createdBy: {
          _id: user._id,
          email: user.email
        },
      }))
    );
    return newGrammars;
  }

  async findQuestionsByAI(_id: string) {
    const grammar = await this.grammarRepository.findOne({ where: { _id } });
    if (!grammar) {
      throw new BadRequestException('Grammar not found');
    }

    const prompt = `
Bạn là chuyên gia ngữ pháp tiếng Anh.

Dưới đây là nội dung bài ngữ pháp mà người học vừa đọc:
"""
${grammar.content}
"""

🎯 Nhiệm vụ của bạn:
Hãy tạo ra 5 câu hỏi luyện tập để giúp người học hiểu và áp dụng ngữ pháp này tốt hơn.

Yêu cầu:
- Câu hỏi phải liên quan trực tiếp đến nội dung ngữ pháp trên.
- Đa dạng loại câu hỏi: trắc nghiệm (4 lựa chọn), điền từ, hoặc chọn câu đúng.
- Mỗi câu hỏi chỉ nên ngắn gọn, cấp độ Beginner – Intermediate.
- Bao gồm đáp án đúng và lời giải thích ngắn.
- Trả về đúng định dạng JSON dưới đây, không thêm bất kỳ văn bản nào ngoài JSON.

Định dạng JSON mẫu:
{
  "grammarTitle": "${grammar.title}",
  "questions": [
    {
      "type": "multiple_choice",
      "question": "Chọn câu đúng theo cấu trúc Subject + Verb + Object.",
      "options": [
        "He plays guitar every day.",
        "Plays he guitar every day.",
        "He play guitar every day.",
        "Guitar he plays every day."
      ],
      "correctAnswer": "He plays guitar every day.",
      "explanation": "Theo cấu trúc S + V + O, chủ ngữ 'He' đứng trước động từ 'plays'."
    },
    {
      "type": "fill_in_blank",
      "question": "______ plays the guitar every evening.",
      "correctAnswer": "He",
      "explanation": "Chủ ngữ 'He' phù hợp với cấu trúc S + V + O."
    }
  ]
}
`;


    const result = await this.genAiProModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const rawText = result.response.text();

    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}");
    const jsonString =
      jsonStart !== -1 && jsonEnd !== -1
        ? rawText.slice(jsonStart, jsonEnd + 1)
        : rawText;

    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.warn("⚠️ AI output not valid JSON, returning raw text.");
      return { overallFeedback: rawText };
    }
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
    const [items, totalItems] = await this.grammarRepository.findAndCount({
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

  async findAllWithoutPagination() {
    return this.grammarRepository.find();
  }

  findOne(_id: number) {
    return `This action returns a #${_id} grammar`;
  }

  update(_id: number, updateGrammarDto: UpdateGrammarDto) {
    return `This action updates a #${_id} grammar`;
  }

  remove(_id: number) {
    return `This action removes a #${_id} grammar`;
  }
}

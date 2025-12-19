import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository, In } from 'typeorm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { LearningPath } from 'src/learning-path/entities/learning-path.entity';
import { LearningStep } from 'src/learning-step/entities/learning-step.entity';
import { LearningTask } from 'src/learning-task/entities/learning-task.entity';
import { UserTaskProgress } from 'src/user-task-progress/entities/user-task-progress.entity';
import { Part1Service } from 'src/part1/part1.service';
import { Part2Service } from 'src/part2/part2.service';
import { Part3Service } from 'src/part3/part3.service';
import { Part4Service } from 'src/part4/part4.service';
import { Part5Service } from 'src/part5/part5.service';
import { Part6Service } from 'src/part6/part6.service';
import { Part7Service } from 'src/part7/part7.service';
import { GrammarsService } from 'src/grammars/grammars.service';
import { User } from 'src/users/entities/user.entity';

interface IUser {
  _id: string;
  [key: string]: any;
}

@Injectable()
export class SurveysService {
  private genAI: GoogleGenerativeAI;
  private genAiProModel: any;

  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
    @InjectRepository(LearningPath) private learningPathRepository: Repository<LearningPath>,
    @InjectRepository(LearningStep) private learningStepRepository: Repository<LearningStep>,
    @InjectRepository(LearningTask) private learningTaskRepository: Repository<LearningTask>,
    @InjectRepository(UserTaskProgress) private userTaskProgressRepository: Repository<UserTaskProgress>,
    private configService: ConfigService,
    private readonly part1Service: Part1Service,
    private readonly part2Service: Part2Service,
    private readonly part3Service: Part3Service,
    private readonly part4Service: Part4Service,
    private readonly part5Service: Part5Service,
    private readonly part6Service: Part6Service,
    private readonly part7Service: Part7Service,
    private readonly grammarsService: GrammarsService,
  ) {
    this.genAI = new GoogleGenerativeAI(this.configService.get<string>('API_GEMINI_KEY')!);
    this.genAiProModel = this.genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
  }

  async create(createSurveyDto: CreateSurveyDto, user: IUser) {
    // tao survey
    const newSurvey = await this.surveyRepository.save({
      ...createSurveyDto,
      userId: user._id,
    });

    // lay du lieu tu database
    const partOneData = await this.part1Service.findAll();
    const partTwoData = await this.part2Service.findAll();
    const partThreeData = await this.part3Service.findAll();
    const partFourData = await this.part4Service.findAll();
    const partFiveData = await this.part5Service.findAll();
    const partSixData = await this.part6Service.findAll();
    const partSevenData = await this.part7Service.findAll();
    const grammarsData = await this.grammarsService.findAllWithoutPagination();

    // tao prompt AI
    const prompt = `
Bạn là hệ thống tạo lộ trình học TOEIC 30 ngày cho người dùng.

Thông tin Survey và người dùng:
- Survey ID: ${newSurvey._id}
- User ID: ${user._id}
- Dữ liệu khảo sát: ${JSON.stringify(createSurveyDto, null, 2)}

Dữ liệu hiện có:
- partOneData = ${JSON.stringify(partOneData.map(p => ({ id: p._id })))}  
- partTwoData = ${JSON.stringify(partTwoData.map(p => ({ id: p._id })))}  
- partThreeData = ${JSON.stringify(partThreeData.map(p => ({ id: p._id })))}  
- partFourData = ${JSON.stringify(partFourData.map(p => ({ id: p._id })))}  
- partFiveData = ${JSON.stringify(partFiveData.map(p => ({ id: p._id })))}  
- partSixData = ${JSON.stringify(partSixData.map(p => ({ id: p._id })))}  
- partSevenData = ${JSON.stringify(partSevenData.map(p => ({ id: p._id })))}  
- grammarsData = ${JSON.stringify(
      grammarsData.map(g => ({
        id: g._id,
        title: g.title,
        content: g.content
      }))
    )}

---------------------------------------
YÊU CẦU SINH RA DUY NHẤT JSON:
{
  "learningPath": {},
  "learningSteps": [],
  "learningTasks": []
}
---------------------------------------

QUY ĐỊNH:
- content: phải là MẢNG ObjectId (string[])
- Grammar → content là mảng 1 phần tử
- Listening / Reading → 3–10 câu tùy mức
- Practice test → có thể mix nhiều Part
- Grammar task description phải lấy trực tiếp từ title.
---------------------------------------
learningPath:
---------------------------------------
- title: "Lộ trình chinh phục TOEIC trong 30 ngày"
- description: "Lộ trình cá nhân hóa dựa trên khảo sát"
- currentDay: 1
- isCompleted: false

---------------------------------------
learningSteps (30 ngày):
---------------------------------------
- 30 step
- mỗi step:
  {
    "title": "",
    "description": "",
    "order": 1..30
  }

---------------------------------------
learningTasks:
---------------------------------------
- mỗi step 3–5 task
- mỗi task:
{
  "title": "",
  "description": "",
  "type": "Part1"|"Part2"|"Part3"|"Part4"|"Part5"|"Part6"|"Part7"|"Grammar",
  "content": ["id1","id2",...],
  "relatedStep": number,
  "isLocked": false
}

---------------------------------------
CHỈ TRẢ VỀ JSON — KHÔNG THÊM GIẢI THÍCH
---------------------------------------
`;

    // gọi AI 
    const result = await this.genAiProModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rawText = result.response.text();
    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}");
    const jsonString =
      jsonStart !== -1 && jsonEnd !== -1
        ? rawText.slice(jsonStart, jsonEnd + 1)
        : rawText;

    let parsedData: any;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (error) {
      console.error("JSON parse lỗi:", error, rawText);
      throw new BadRequestException("AI trả về dữ liệu không hợp lệ");
    }

    const { learningPath, learningSteps, learningTasks } = parsedData;

    // ===== BƯỚC 1: TẠO LEARNING PATH TRƯỚC (KHÔNG CÓ STEPS) =====
    let createdPath;
    try {
      createdPath = await this.learningPathRepository.save({
        title: learningPath.title || "Lộ trình chinh phục TOEIC trong 30 ngày",
        description: learningPath.description || "Lộ trình cá nhân hóa dựa trên khảo sát",
        currentDay: learningPath.currentDay || 1,
        isCompleted: learningPath.isCompleted || false,
        user: { _id: user._id } as User,
        survey: { _id: newSurvey._id } as Survey,
        isDeleted: false,
      });
    } catch (error) {
      throw new BadRequestException('Không thể tạo Learning Path');
    }

    let createdSteps;
    try {
      const stepsToCreate = learningSteps.map((s: any, idx: number) => ({
        title: s.title,
        description: s.description,
        order: s.order,
        unlockAt: new Date(Date.now() + idx * 24 * 60 * 60 * 1000),
        learningPath: createdPath, 
        isDeleted: false,
      }));

      createdSteps = await this.learningStepRepository.save(stepsToCreate);
      console.log(`✅ Created ${createdSteps.length} Learning Steps`);
    } catch (error) {
      console.error('❌ Lỗi tạo Learning Steps:', error);
      throw new BadRequestException('Không thể tạo Learning Steps');
    }

    // ===== BƯỚC 3: TẠO TASKS VÀ GẮN VÀO STEP =====
    let createdTasks;
    try {
      const tasksToCreate = learningTasks.map((t: any) => {
        // Tìm step tương ứng dựa trên relatedStep
        const relatedStepEntity = createdSteps.find(
          (s) => s.order === t.relatedStep
        );

        if (!relatedStepEntity) {
          console.warn(`⚠️ Không tìm thấy step cho task: ${t.title}, relatedStep: ${t.relatedStep}`);
        }

        return {
          title: t.title,
          description: t.description,
          type: t.type,
          content: Array.isArray(t.content) ? t.content : [],
          isLocked: t.isLocked || false,
          relatedStep: t.relatedStep,
          step: relatedStepEntity || null, // ✅ GẮN NGAY STEP (hoặc null nếu không tìm thấy)
          isDeleted: false,
        };
      });

      createdTasks = await this.learningTaskRepository.save(tasksToCreate);
      console.log(`✅ Created ${createdTasks.length} Learning Tasks`);
    } catch (error) {
      console.error('❌ Lỗi tạo Learning Tasks:', error);
      throw new BadRequestException('Không thể tạo Learning Tasks');
    }

    // ===== BƯỚC 4: TẠO USER TASK PROGRESS =====
    const progressToCreate = createdTasks.map((task) => ({
      user: { _id: user._id } as User,
      task: task,
      completed: false,
      submittedAt: null,
      score: 0,
      feedback: "",
      isDeleted: false,
    }));

    await this.userTaskProgressRepository.save(progressToCreate);

    // ===== BƯỚC 5: TẢI LẠI DỮ LIỆU ĐẦY ĐỦ =====
    const finalPath = await this.learningPathRepository.findOne({
      where: { _id: createdPath._id },
      relations: ['user', 'survey', 'steps', 'steps.tasks'],
    });

    return {
      survey: newSurvey,
      learningPath: finalPath,
      learningSteps: createdSteps,
      learningTasks: createdTasks,
    };
  }

  findAll() {
    return `This action returns all surveys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} survey`;
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }
}

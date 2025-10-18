import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.questionService.findOne(+_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+_id, updateQuestionDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.questionService.remove(+_id);
  }
}

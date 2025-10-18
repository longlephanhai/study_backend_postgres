import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('exam-result')
export class ExamResultController {
  constructor(private readonly examResultService: ExamResultService) { }

  @Post()
  @ResponseMessage('Submit exam result successfully')
  create(@Body() createExamResultDto: CreateExamResultDto, @User() user: IUser) {
    return this.examResultService.create(createExamResultDto, user);
  }

  @Get()
  findAll() {
    return this.examResultService.findAll();
  }

  @Get(':_id')
  @ResponseMessage('Get exam result successfully')
  findOne(@Param('_id') _id: string, @User() user: IUser) {
    return this.examResultService.findOne(_id, user);
  }

  @Get('user/history')
  @ResponseMessage('Get all history exam results a user successfully')
  getHistoryExamResults(@User() user: IUser) {
    return this.examResultService.getHistoryExamResults(user);
  }

  @Get('user/predict')
  @ResponseMessage('Get exam results predicted for a user successfully')
  getPredictedExamResults(@User() user: IUser) {
    return this.examResultService.getPredictedExamResults(user);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateExamResultDto: UpdateExamResultDto) {
    return this.examResultService.update(+_id, updateExamResultDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.examResultService.remove(+_id);
  }
}

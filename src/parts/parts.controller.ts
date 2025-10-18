import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PartsService } from './parts.service';
import { UpdatePartDto } from './dto/update-part.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export interface StartTestDTO {
  partIds: string[];
}

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) { }

  @Post(':_id/questions')
  @ResponseMessage('Question created successfully')
  createQuestion(@Param('_id') _id: string, @Body() createQuestionDTO: CreateQuestionDto, @User() user: IUser) {
    return this.partsService.createQuestion(_id, createQuestionDTO, user);
  }

  @Post(':_id/questions/multiple')
  @ResponseMessage('Questions created successfully')
  createMultipleQuestion(@Param('_id') _id: string, @Body() createQuestionDTO: CreateQuestionDto[], @User() user: IUser) {
    return this.partsService.createMultipleQuestions(_id, createQuestionDTO, user);
  }

  @Get()
  @ResponseMessage("Get all parts with pagination")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.partsService.findAll(+currentPage, +limit, qs);
  }

  @Post('start')
  @ResponseMessage("Get all parts to start a test")
  findAllToStart(@Body() startTestDTO: StartTestDTO) {
    return this.partsService.findAllToStart(startTestDTO);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.partsService.findOne(+_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partsService.update(+_id, updatePartDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.partsService.remove(+_id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WritingHistoryService } from './writing-history.service';
import { CreateWritingHistoryDto } from './dto/create-writing-history.dto';
import { UpdateWritingHistoryDto } from './dto/update-writing-history.dto';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('writing-history')
export class WritingHistoryController {
  constructor(private readonly writingHistoryService: WritingHistoryService) { }

  @Post()
  @ResponseMessage('Save writing history successfully')
  create(@Body() createWritingHistoryDto: CreateWritingHistoryDto) {
    return this.writingHistoryService.create(createWritingHistoryDto);
  }

  @Get()
  @ResponseMessage("Get all writing history with pagination")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.writingHistoryService.findAll(+currentPage, +limit, qs);
  }

  @Get('by-user')
  @ResponseMessage("Get all writing history by userId")
  findByUserId(@User('_id') userId: string) {
    return this.writingHistoryService.findByUserId(userId);
  }

  @Get(':_id')
  @ResponseMessage("Get writing history by _id")
  findOne(@Param('_id') _id: string, @User('_id') userId: string) {
    return this.writingHistoryService.findOne(_id, userId);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateWritingHistoryDto: UpdateWritingHistoryDto) {
    return this.writingHistoryService.update(+_id, updateWritingHistoryDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.writingHistoryService.remove(+_id);
  }
}

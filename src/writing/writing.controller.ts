import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WritingService } from './writing.service';
import { CreateWritingDto } from './dto/create-writing.dto';
import { UpdateWritingDto } from './dto/update-writing.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('writing')
export class WritingController {
  constructor(private readonly writingService: WritingService) { }

  @Post()
  create(@Body() createWritingDto: CreateWritingDto) {
    return this.writingService.create(createWritingDto);
  }

  @Post('multiple')
  @ResponseMessage('Create multiple writings successfully')
  createMultiple(@Body() createWritingDto: CreateWritingDto[]) {
    return this.writingService.createMultiple(createWritingDto);
  }

  @Get()
  @ResponseMessage("Get all writings with pagination")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.writingService.findAll(+currentPage, +limit, qs);
  }

  @Get(':_id')
  @ResponseMessage("Get writing successfully")
  findOne(@Param('_id') _id: string) {
    return this.writingService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateWritingDto: UpdateWritingDto) {
    return this.writingService.update(+_id, updateWritingDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.writingService.remove(+_id);
  }
}

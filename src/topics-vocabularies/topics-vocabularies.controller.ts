import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TopicsVocabulariesService } from './topics-vocabularies.service';
import { CreateTopicsVocabularyDto } from './dto/create-topics-vocabulary.dto';
import { UpdateTopicsVocabularyDto } from './dto/update-topics-vocabulary.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { CreateVocabularyDto } from 'src/vocabularies/dto/create-vocabulary.dto';

@Controller('topics-vocabularies')
export class TopicsVocabulariesController {
  constructor(private readonly topicsVocabulariesService: TopicsVocabulariesService) { }

  @Post()
  create(@Body() createTopicsVocabularyDto: CreateTopicsVocabularyDto) {
    return this.topicsVocabulariesService.create(createTopicsVocabularyDto);
  }

  @Post('multiple')
  @ResponseMessage('Multiple topics vocabularies created successfully')
  createMultiple(@Body() createTopicsVocabularyDtos: CreateTopicsVocabularyDto[]) {
    return this.topicsVocabulariesService.createMultiple(createTopicsVocabularyDtos);
  }

  @Post(':_id/vocabularies/multiple')
  @ResponseMessage('Part created successfully')
  createPart(@Param('_id') _id: string, @Body() createVocabularyDto: CreateVocabularyDto[], @User() user: IUser) {
    return this.topicsVocabulariesService.createMultipleVocabulary(_id, createVocabularyDto, user);
  }

  @Get()
  @ResponseMessage("Get all topics vocabularies with pagination")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.topicsVocabulariesService.findAll(+currentPage, +limit, qs);
  }

  @Get('ai-review/:_id')
  @ResponseMessage("Create questions for AI review")
  getVocabulariesForAiReview(@Param('_id') _id: string) {
    return this.topicsVocabulariesService.getVocabulariesFromAI(_id);
  }

  @Get(':_id')
  @ResponseMessage("Get a topics vocabulary by _id")
  findOne(@Param('_id') _id: string) {
    return this.topicsVocabulariesService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateTopicsVocabularyDto: UpdateTopicsVocabularyDto) {
    return this.topicsVocabulariesService.update(+_id, updateTopicsVocabularyDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.topicsVocabulariesService.remove(+_id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';

@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) {}

  @Post()
  create(@Body() createVocabularyDto: CreateVocabularyDto) {
    return this.vocabulariesService.create(createVocabularyDto);
  }

  @Get()
  findAll() {
    return this.vocabulariesService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.vocabulariesService.findOne(+_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateVocabularyDto: UpdateVocabularyDto) {
    return this.vocabulariesService.update(+_id, updateVocabularyDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.vocabulariesService.remove(+_id);
  }
}

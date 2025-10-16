import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Part5MistakesService } from './part5-mistakes.service';
import { CreatePart5MistakeDto } from './dto/create-part5-mistake.dto';
import { UpdatePart5MistakeDto } from './dto/update-part5-mistake.dto';

@Controller('part5-mistakes')
export class Part5MistakesController {
  constructor(private readonly part5MistakesService: Part5MistakesService) {}

  @Post()
  create(@Body() createPart5MistakeDto: CreatePart5MistakeDto) {
    return this.part5MistakesService.create(createPart5MistakeDto);
  }

  @Get()
  findAll() {
    return this.part5MistakesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.part5MistakesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePart5MistakeDto: UpdatePart5MistakeDto) {
    return this.part5MistakesService.update(+id, updatePart5MistakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.part5MistakesService.remove(+id);
  }
}

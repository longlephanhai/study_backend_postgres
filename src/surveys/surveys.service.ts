import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveysService {

  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) { }

  async create(createSurveyDto: CreateSurveyDto, user: IUser) {
    const newSurvey = await this.surveyRepository.save({
      ...createSurveyDto,
      userId: user._id,
    });
    return newSurvey;
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

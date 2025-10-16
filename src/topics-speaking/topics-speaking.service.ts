import { Injectable } from '@nestjs/common';
import { CreateTopicsSpeakingDto } from './dto/create-topics-speaking.dto';
import { UpdateTopicsSpeakingDto } from './dto/update-topics-speaking.dto';

@Injectable()
export class TopicsSpeakingService {
  create(createTopicsSpeakingDto: CreateTopicsSpeakingDto) {
    return 'This action adds a new topicsSpeaking';
  }

  findAll() {
    return `This action returns all topicsSpeaking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicsSpeaking`;
  }

  update(id: number, updateTopicsSpeakingDto: UpdateTopicsSpeakingDto) {
    return `This action updates a #${id} topicsSpeaking`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicsSpeaking`;
  }
}

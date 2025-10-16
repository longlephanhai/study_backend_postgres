import { Controller } from '@nestjs/common';
import { WritingAiService } from './writing-ai.service';

@Controller('writing-ai')
export class WritingAiController {
  constructor(private readonly writingAiService: WritingAiService) {}
}

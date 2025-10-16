import { Controller } from '@nestjs/common';
import { SpeakingAiService } from './speaking-ai.service';

@Controller('speaking-ai')
export class SpeakingAiController {
  constructor(private readonly speakingAiService: SpeakingAiService) {}
}

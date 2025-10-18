import { IsNotEmpty } from "class-validator";


export class CreateWritingHistoryDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  writingId: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  feedback: WritingFeedback;

  @IsNotEmpty()
  score: any;
}

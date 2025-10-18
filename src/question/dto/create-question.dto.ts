import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
export class CreateQuestionDto {
  @IsNotEmpty({ message: 'Questions number is required' })
  @IsNumber({}, { message: 'Questions number must be a number' })
  numberQuestion: number;

  @IsOptional()
  questionContent?: string;

  @IsNotEmpty({ message: 'Options are required' })
  options: string[];

  @IsNotEmpty({ message: 'Correct answer is required' })
  correctAnswer: string;

  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @IsOptional()
  explanation?: string;

  @IsOptional()
  audioUrl?: string;

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  transcript?: string;

  @IsOptional()
  reading?: string[];
}

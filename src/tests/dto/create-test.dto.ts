import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTestDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;


  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;


  @IsOptional()
  durationSec: number;


  @IsNotEmpty({ message: 'IsPublic is required' })
  isPublic: boolean;


  @IsNotEmpty({ message: 'TotalQuestions is required' })
  totalQuestions: number;

  @IsString({ message: 'AudioUrl must be a string' })
  @IsNotEmpty({ message: 'AudioUrl is required' })
  audioUrl: string;

  // // parts
  // @IsOptional()
  // @IsMongoId({ each: true, message: "each part must be a mongo object id" })
  // @IsArray({ message: 'parts must be an array' })
  // parts?: string[];
}

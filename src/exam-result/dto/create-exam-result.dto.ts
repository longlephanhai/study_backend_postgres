import { IsNotEmpty, IsOptional, IsUUID, IsNumber } from "class-validator";
import { Part } from "src/parts/entities/part.entity"; 

export class CreateExamResultDto {
  @IsNotEmpty()
  @IsUUID("all", { message: "testId must be a valid UUID" })
  testId: string;

  @IsNotEmpty()
  @IsNumber({}, { message: "totalCorrect must be a number" })
  totalCorrect: number;

  @IsOptional()
  @IsNumber({}, { message: "totalListeningCorrect must be a number" })
  totalListeningCorrect?: number;

  @IsOptional()
  @IsNumber({}, { message: "totalReadingCorrect must be a number" })
  totalReadingCorrect?: number;

  @IsOptional()
  parts?: Part[];

  @IsOptional()
  @IsUUID("all", { each: true, message: "correctAnswer must be an array of UUIDs" })
  correctAnswer?: string[];

  @IsOptional()
  @IsUUID("all", { each: true, message: "wrongAnswer must be an array of UUIDs" })
  wrongAnswer?: string[];

  @IsOptional()
  @IsUUID("all", { each: true, message: "noAnswer must be an array of UUIDs" })
  noAnswer?: string[];
}

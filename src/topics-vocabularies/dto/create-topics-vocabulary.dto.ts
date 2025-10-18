import { IsNotEmpty, IsOptional } from "class-validator";


export class CreateTopicsVocabularyDto {
  @IsNotEmpty()
  topic: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  vocabularies: string[];
}

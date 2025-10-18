import { IsNotEmpty } from "class-validator";

export class CreatePart5MistakeDto {
  @IsNotEmpty()
  categoryPart5Mistakes: string[]
}

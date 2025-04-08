import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(35)
  name: string;
}

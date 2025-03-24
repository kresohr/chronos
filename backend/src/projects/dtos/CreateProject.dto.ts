import { IsNotEmpty, Length, Max, max, Min } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @Min(2)
  @Max(35)
  name: string;
}

import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteProjectDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

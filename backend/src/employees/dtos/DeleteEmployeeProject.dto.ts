import { IsNotEmpty, IsNumber } from 'class-validator';
export class DeleteEmployeeProjectDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}

import { IsNotEmpty, IsNumber } from 'class-validator';

export class FetchProjectEmployeesDto {
  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}

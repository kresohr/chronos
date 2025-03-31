import { IsNotEmpty, IsNumber } from 'class-validator';
export class FetchEmployeeProjectsDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

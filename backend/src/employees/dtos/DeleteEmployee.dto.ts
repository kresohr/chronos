import { IsNotEmpty, IsNumber } from 'class-validator';
export class DeleteEmployeeDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

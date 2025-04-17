import { IsNotEmpty, IsNumber } from 'class-validator';

export class FetchEmployeeDetailsDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

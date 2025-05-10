import { IsNotEmpty, IsNumber } from 'class-validator';

export class FetchEmployeeEntriesDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

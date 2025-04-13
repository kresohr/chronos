import { IsNotEmpty, IsNumber } from 'class-validator';

export class FetchProjectDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEntryDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  timeLogged: number;
}

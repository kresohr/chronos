import { IsNotEmpty, IsNumber } from 'class-validator';

export class FetchRoleDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

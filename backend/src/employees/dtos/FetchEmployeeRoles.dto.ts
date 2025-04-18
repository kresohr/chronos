import { IsNotEmpty, IsNumber } from 'class-validator';
export class FetchEmployeeRolesDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

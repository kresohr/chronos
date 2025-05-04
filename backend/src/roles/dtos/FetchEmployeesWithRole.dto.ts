import { IsNotEmpty, IsNumber } from 'class-validator';

export class FetchEmployeesWithRoleDto {
  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}

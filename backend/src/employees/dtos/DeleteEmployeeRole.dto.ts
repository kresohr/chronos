import { IsNotEmpty, IsNumber } from 'class-validator';
export class DeleteEmployeeRoleDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}

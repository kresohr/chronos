import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class AssignRoleToEmployeeDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsNotEmpty()
  @IsInt()
  roleId: number;
}

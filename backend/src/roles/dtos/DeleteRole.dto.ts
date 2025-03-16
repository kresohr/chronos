import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteRoleDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

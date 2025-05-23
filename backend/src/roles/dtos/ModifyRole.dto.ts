import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ModifyRoleDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

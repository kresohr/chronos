import { IsNotEmpty, IsString } from 'class-validator';

export class AddRoleToUserDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;
}

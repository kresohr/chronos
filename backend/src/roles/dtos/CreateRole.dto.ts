import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(35)
  name: string;
}

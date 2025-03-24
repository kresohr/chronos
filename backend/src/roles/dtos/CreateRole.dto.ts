import { IsNotEmpty, Min, Max } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @Min(2)
  @Max(35)
  name: string;
}

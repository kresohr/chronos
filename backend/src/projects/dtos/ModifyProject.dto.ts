import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ModifyProjectDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

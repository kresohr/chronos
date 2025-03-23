import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @IsOptional()
  roleId?: number;

  @IsInt()
  @IsOptional()
  projectId?: number;

  @IsString()
  @IsOptional()
  keycloakId?: string;
}

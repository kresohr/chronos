import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dtos/CreateRole.dto';
import { DeleteRoleDto } from 'src/roles/dtos/DeleteRole.dto';
import { RolesService } from 'src/roles/services/roles.service';
import { FetchEmployeesWithRoleDto } from '../dtos/FetchEmployeesWithRole.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Get()
  getRoles() {
    return this.rolesService.fetchRoles();
  }

  @Get(':id/employees')
  @UsePipes(new ValidationPipe())
  fetchEmployeesWithRole(@Param('id', ParseIntPipe) id: number) {
    const dto: FetchEmployeesWithRoleDto = { roleId: id };
    return this.rolesService.fetchEmployeesWithRole(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createRole(@Body() data: CreateRoleDto) {
    return this.rolesService.createRole(data);
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  DeleteRole(@Body() data: DeleteRoleDto) {
    return this.rolesService.deleteRole(data);
  }
}

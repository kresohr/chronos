import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dtos/CreateRole.dto';
import { DeleteRoleDto } from 'src/roles/dtos/DeleteRole.dto';
import { RolesService } from 'src/roles/services/roles.service';
import { FetchEmployeesWithRoleDto } from '../dtos/FetchEmployeesWithRole.dto';
import { FetchRoleDetailsDto } from '../dtos/FetchRoleDetails.dto';
import { ModifyRoleDto } from '../dtos/ModifyRole.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Get()
  getRoles() {
    return this.rolesService.fetchRoles();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  fetchRoleDetails(@Param('id', ParseIntPipe) id: number) {
    const dto: FetchRoleDetailsDto = { id };
    return this.rolesService.fetchRoleDetails(dto);
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

  @Put(':id')
  @UsePipes(new ValidationPipe())
  modifyRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ModifyRoleDto,
  ) {
    const dto: ModifyRoleDto = { id, name: data.name };
    return this.rolesService.modifyRole(dto);
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  DeleteRole(@Body() data: DeleteRoleDto) {
    return this.rolesService.deleteRole(data);
  }
}

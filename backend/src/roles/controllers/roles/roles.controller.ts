import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dtos/CreateRole.dto';
import { DeleteRoleDto } from 'src/roles/dtos/DeleteRole.dto';
import { RolesService } from 'src/roles/services/roles/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Get()
  getRoles() {
    return this.rolesService.fetchRoles();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createRole(@Body() data: CreateRoleDto) {
    return this.rolesService.createRole(data);
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  DeleteRole(@Body() data: DeleteRoleDto) {
    return this.rolesService.deleteRole(data.id);
  }
}

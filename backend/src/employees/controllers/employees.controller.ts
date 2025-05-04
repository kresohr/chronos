import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employees/dtos/CreateEmployee.dto';
import { DeleteEmployeeDto } from 'src/employees/dtos/DeleteEmployee.dto';
import { DeleteEmployeeProjectDto } from 'src/employees/dtos/DeleteEmployeeProject.dto';
import { FetchEmployeeProjectsDto } from 'src/employees/dtos/FetchEmployeeProjects.dto';
import { EmployeesService } from 'src/employees/service/employees.service';
import { FetchEmployeeDetailsDto } from '../dtos/FetchEmployeeDetails.dto';
import { FetchEmployeeRolesDto } from '../dtos/FetchEmployeeRoles.dto';
import { DeleteEmployeeRoleDto } from '../dtos/DeleteEmployeeRole.dto';
import { ModifyEmployeeDto } from '../dtos/ModifyEmployee.dto';
import { AssignRoleToEmployeeDto } from '../dtos/AssignRoleToEmployee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}
  @Get()
  getEmployees() {
    return this.employeesService.getEmployees();
  }

  @Get(':userid/projects/')
  @UsePipes(new ValidationPipe())
  getEmployeeProjects(@Param('userid', ParseIntPipe) userId: number) {
    const dto: FetchEmployeeProjectsDto = { userId };
    return this.employeesService.fetchEmployeeProjects(dto);
  }

  @Get(':userid/roles/')
  @UsePipes(new ValidationPipe())
  getEmployeeRoles(@Param('userid', ParseIntPipe) userId: number) {
    const dto: FetchEmployeeRolesDto = { userId };
    return this.employeesService.fetchEmployeeRoles(dto);
  }

  @Get(':userid')
  @UsePipes(new ValidationPipe())
  fetchEmployeeDetails(@Param('userid', ParseIntPipe) userId: number) {
    const dto: FetchEmployeeDetailsDto = { userId };
    return this.employeesService.fetchEmployeeDetails(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createEmployee(@Body() employeeData: CreateEmployeeDto) {
    return this.employeesService.createEmployee(employeeData);
  }

  @Post(':userid/roles/add')
  @UsePipes(new ValidationPipe())
  assignRole(
    @Param('userid', ParseIntPipe) userId: number,
    @Body() employeeData: AssignRoleToEmployeeDto,
  ) {
    employeeData.userId = userId;
    return this.employeesService.addRoleToEmployee(employeeData);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  modifyEmployee(
    @Param('id', ParseIntPipe) userId: number,
    @Body() employeeData: ModifyEmployeeDto,
  ) {
    return this.employeesService.modifyEmployee(userId, employeeData);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  deleteEmployee(@Param('id', ParseIntPipe) userId: number) {
    const dto: DeleteEmployeeDto = { userId };
    return this.employeesService.deleteEmployee(dto);
  }

  @Delete(':userid/projects/:projectid')
  @UsePipes(new ValidationPipe())
  deleteProjectFromEmployee(
    @Param('userid', ParseIntPipe) userId: number,
    @Param('projectid', ParseIntPipe) projectId: number,
  ) {
    const dto: DeleteEmployeeProjectDto = { userId, projectId };
    return this.employeesService.deleteProjectFromEmployee(dto);
  }

  @Delete(':userid/roles/:roleid')
  @UsePipes(new ValidationPipe())
  deletRoleFromEmployee(
    @Param('userid', ParseIntPipe) userId: number,
    @Param('roleid', ParseIntPipe) roleId: number,
  ) {
    const dto: DeleteEmployeeRoleDto = { userId, roleId };
    return this.employeesService.deleteRoleFromEmployee(dto);
  }
}

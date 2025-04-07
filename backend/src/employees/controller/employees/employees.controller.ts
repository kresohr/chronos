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
import { CreateEmployeeDto } from 'src/employees/dtos/CreateEmployee.dto';
import { DeleteEmployeeDto } from 'src/employees/dtos/DeleteEmployee.dto';
import { DeleteEmployeeProjectDto } from 'src/employees/dtos/DeleteEmployeeProject.dto';
import { FetchEmployeeProjectsDto } from 'src/employees/dtos/FetchEmployeeProjects.dto';
import { EmployeesService } from 'src/employees/service/employees/employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}
  @Get()
  getEmployees() {
    return this.employeesService.getEmployees();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createEmployee(@Body() employeeData: CreateEmployeeDto) {
    return this.employeesService.createEmployee(employeeData);
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  deleteEmployee(@Body() employeeData: DeleteEmployeeDto) {
    return this.employeesService.deleteEmployee(employeeData);
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

  @Get(':userid/projects/')
  @UsePipes(new ValidationPipe())
  getEmployeeProjects(@Param('userid', ParseIntPipe) employeeData: number) {
    const dto: FetchEmployeeProjectsDto = { userId: employeeData };
    return this.employeesService.fetchEmployeeProjects(dto);
  }
}

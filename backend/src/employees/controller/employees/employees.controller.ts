import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employees/dtos/CreateEmployee.dto';
import { DeleteEmployeeDto } from 'src/employees/dtos/DeleteEmployee.dto';
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
    return this.employeesService.deleteEmployee(employeeData.id);
  }
}

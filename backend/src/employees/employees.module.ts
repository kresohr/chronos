import { Module } from '@nestjs/common';
import { EmployeesController } from './controller/employees/employees.controller';
import { EmployeesService } from './service/employees/employees.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}

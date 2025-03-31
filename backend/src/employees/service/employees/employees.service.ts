import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from 'src/employees/dtos/CreateEmployee.dto';
import { FetchEmployeeProjectsDto } from 'src/employees/dtos/FetchEmployeeProjects.dto';
import { DeleteEmployeeDto } from 'src/employees/dtos/DeleteEmployee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}
  getEmployees() {
    return this.prisma.user.findMany();
  }

  async createEmployee(data: CreateEmployeeDto) {
    try {
      const { roleId, projectId, ...userData } = data;

      const user = await this.prisma.user.create({
        data: userData,
      });

      if (roleId) {
        await this.prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: roleId,
          },
        });
      }

      if (projectId) {
        await this.prisma.userProject.create({
          data: {
            userId: user.id,
            projectId: projectId,
          },
        });
      }

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `User with email ${data.email} already exists.`,
        );
      }
      throw error;
    }
  }

  async deleteEmployee(data: DeleteEmployeeDto) {
    try {
      const deletedEmployee = await this.prisma.user.delete({
        where: {
          id: data.userId,
        },
      });
      return deletedEmployee;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Employee with id ${data.userId} does not exist.`,
        );
      }
      throw error;
    }
  }

  async fetchEmployeeProjects(data: FetchEmployeeProjectsDto) {
    try {
      return this.prisma.userProject.findMany({
        where: {
          userId: data.userId,
        },
        select: {
          userId: true,
          project: true,
        },
      });
    } catch {}
  }
}

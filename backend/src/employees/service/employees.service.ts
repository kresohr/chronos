import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from 'src/employees/dtos/CreateEmployee.dto';
import { FetchEmployeeProjectsDto } from 'src/employees/dtos/FetchEmployeeProjects.dto';
import { DeleteEmployeeDto } from 'src/employees/dtos/DeleteEmployee.dto';
import { DeleteEmployeeProjectDto } from 'src/employees/dtos/DeleteEmployeeProject.dto';
import { FetchEmployeeDetailsDto } from '../dtos/FetchEmployeeDetails.dto';
import { FetchEmployeeRolesDto } from '../dtos/FetchEmployeeRoles.dto';
import { DeleteEmployeeRoleDto } from '../dtos/DeleteEmployeeRole.dto';
import { ModifyEmployeeDto } from '../dtos/ModifyEmployee.dto';
import { Prisma } from '@prisma/client';
import { AssignRoleToEmployeeDto } from '../dtos/AssignRoleToEmployee.dto';

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

  async fetchEmployeeProjects(data: FetchEmployeeProjectsDto) {
    try {
      const projects = await this.prisma.userProject.findMany({
        where: {
          userId: data.userId,
        },
        select: {
          project: true,
        },
      });
      return projects.map((data) => data.project);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Employee with id ${data.userId} does not exist.`,
        );
      }
      throw error;
    }
  }

  async fetchEmployeeRoles(data: FetchEmployeeRolesDto) {
    try {
      const roles = await this.prisma.userRole.findMany({
        where: {
          userId: data.userId,
        },
        select: {
          role: true,
        },
      });
      return roles.map((data) => data.role);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Employee with id ${data.userId} does not exist.`,
        );
      }
      throw error;
    }
  }

  async fetchEmployeeDetails(data: FetchEmployeeDetailsDto) {
    try {
      const fetchedEmployee = await this.prisma.user.findUnique({
        where: {
          id: data.userId,
        },
      });
      return fetchedEmployee;
    } catch (error) {
      if ((error.code = 'P2025')) {
        throw new NotFoundException(
          `Employee with id ${data.userId} does not exist.`,
        );
      }
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

  async deleteProjectFromEmployee(data: DeleteEmployeeProjectDto) {
    try {
      const deletedProject = await this.prisma.userProject.delete({
        where: {
          userId_projectId: {
            userId: data.userId,
            projectId: data.projectId,
          },
        },
      });
      return deletedProject;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `The given userId or projectId does not exist.`,
        );
      }
      throw error;
    }
  }

  async deleteRoleFromEmployee(data: DeleteEmployeeRoleDto) {
    try {
      const deletedRole = await this.prisma.userRole.delete({
        where: {
          userId_roleId: {
            userId: data.userId,
            roleId: data.roleId,
          },
        },
      });
      return deletedRole;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `The given userId or roleId does not exist.`,
        );
      }
      throw error;
    }
  }

  // TODO: Double-check syntax and logic to ensure this is what we want.
  async modifyEmployee(id: number, data: ModifyEmployeeDto) {
    const employee = this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID: ${id} not found!`);
    }

    const employeeUpdateData: Prisma.UserUpdateInput = {};

    if (data.email !== undefined) {
      employeeUpdateData.email = data.email;
    }

    if (data.firstName !== undefined) {
      employeeUpdateData.firstName = data.firstName;
    }

    if (data.lastName !== undefined) {
      employeeUpdateData.lastName = data.lastName;
    }

    if (data.isAdmin !== undefined) {
      employeeUpdateData.isAdmin = data.isAdmin;
    }

    if (data.roleIds !== undefined) {
      employeeUpdateData.roles = {
        deleteMany: {},
        create: data.roleIds.map((roleId) => ({
          role: {
            connect: {
              id: roleId,
            },
          },
        })),
      };
    }

    if (data.projectIds !== undefined) {
      employeeUpdateData.projects = {
        deleteMany: {},
        create: data.projectIds.map((projectId) => ({
          project: {
            connect: {
              id: projectId,
            },
          },
        })),
      };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: employeeUpdateData,
      include: {
        roles: { include: { role: true } },
        projects: { include: { project: true } },
      },
    });
  }

  async addRoleToEmployee(data: AssignRoleToEmployeeDto) {
    try {
      const existingRole = await this.prisma.userRole.findUnique({
        where: {
          userId_roleId: {
            userId: data.userId,
            roleId: data.roleId,
          },
        },
      });

      if (existingRole) {
        throw new ConflictException(`Role already assigned to this user.`);
      }

      const newUserRole = await this.prisma.userRole.create({
        data: {
          userId: data.userId,
          roleId: data.roleId,
        },
      });

      return newUserRole;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User or Role does not exist.`);
      }
      throw error;
    }
  }
}

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}
  getEmployees() {
    return this.prisma.user.findMany();
  }

  async createEmployee(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `User with email ${data.email} already exists.`,
        );
      }
      throw error;
    }
  }

  async deleteEmployee(id: number) {
    try {
      const deletedEmployee = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return deletedEmployee;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Employee with id ${id} does not exist.`);
      }
      throw error;
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  fetchRoles() {
    return this.prisma.role.findMany();
  }

  createRole(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data });
  }

  async deleteRole(id: number) {
    try {
      const deletedRole = await this.prisma.role.delete({
        where: {
          id: id,
        },
      });
      return deletedRole;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Role with id ${id} does not exist.`);
      }
      throw error;
    }
  }
}

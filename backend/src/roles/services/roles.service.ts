import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FetchEmployeesWithRoleDto } from '../dtos/FetchEmployeesWithRole.dto';
import { DeleteRoleDto } from '../dtos/DeleteRole.dto';
import { FetchRoleDetailsDto } from '../dtos/FetchRoleDetails.dto';
import { ModifyRoleDto } from '../dtos/ModifyRole.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  fetchRoles() {
    return this.prisma.role.findMany();
  }

  async fetchRoleDetails(data: FetchRoleDetailsDto) {
    try {
      const roles = this.prisma.role.findUnique({
        where: {
          id: data.id,
        },
      });

      return roles;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Role with id ${data.id} does not exist.`);
      }
      throw error;
    }
  }

  createRole(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data });
  }

  async modifyRole(data: ModifyRoleDto) {
    try {
      const modifiedRole = await this.prisma.role.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
        },
      });
      return modifiedRole;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Role with id ${data.id} does not exist.`);
      }
      throw error;
    }
  }

  async deleteRole(data: DeleteRoleDto) {
    try {
      const deletedRole = await this.prisma.role.delete({
        where: {
          id: data.id,
        },
      });
      return deletedRole;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Role with id ${data.id} does not exist.`);
      }
      throw error;
    }
  }

  async fetchEmployeesWithRole(data: FetchEmployeesWithRoleDto) {
    try {
      const users = await this.prisma.userRole.findMany({
        where: {
          roleId: data.roleId,
        },
        select: {
          user: true,
        },
      });
      return users;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Role with id ${data.roleId} does not exist.`,
        );
      }
      throw error;
    }
  }
}

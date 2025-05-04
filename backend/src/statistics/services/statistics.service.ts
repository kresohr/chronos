import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async countAllData() {
    try {
      const [userCount, roleCount, projectCount, entriesCount] =
        await this.prisma.$transaction([
          this.prisma.user.count(),
          this.prisma.role.count(),
          this.prisma.project.count(),
          this.prisma.entry.count(),
        ]);

      return {
        totalUsers: userCount,
        totalRoles: roleCount,
        totalProjects: projectCount,
        totalEntries: entriesCount,
      };
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  fetchProjects() {
    return this.prisma.project.findMany();
  }

  createProject(data: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({ data });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from 'src/projects/dtos/CreateProject.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  fetchProjects() {
    return this.prisma.project.findMany();
  }

  createProject(data: CreateProjectDto) {
    return this.prisma.project.create({ data });
  }

  async deleteProject(id: number) {
    try {
      const deletedProject = await this.prisma.project.delete({
        where: {
          id: id,
        },
      });
      return deletedProject;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Project with id ${id} does not exist.`);
      }
      throw error;
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from 'src/projects/dtos/CreateProject.dto';
import { DeleteProjectDto } from 'src/projects/dtos/DeleteProject.dto';
import { FetchProjectDetailsDto } from 'src/projects/dtos/FetchProjectDetails.dto';
import { ModifyProjectDto } from 'src/projects/dtos/ModifyProject.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  fetchProjects() {
    return this.prisma.project.findMany();
  }

  fetchProjectDetails(data: FetchProjectDetailsDto) {
    return this.prisma.project.findUnique({
      where: {
        id: data.id,
      },
    });
  }

  createProject(data: CreateProjectDto) {
    return this.prisma.project.create({ data });
  }

  async deleteProject(data: DeleteProjectDto) {
    try {
      const deletedProject = await this.prisma.project.delete({
        where: {
          id: data.id,
        },
      });
      return deletedProject;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Project with id ${data.id} does not exist.`,
        );
      }
      throw error;
    }
  }

  async modifyProject(data: ModifyProjectDto) {
    try {
      const modifiedProject = await this.prisma.project.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
        },
      });
      return modifiedProject;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Project with id ${data.id} does not exist.`,
        );
      }
      throw error;
    }
  }
}

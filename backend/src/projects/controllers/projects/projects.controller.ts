import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from 'src/projects/dtos/CreateProject.dto';
import { ProjectsService } from 'src/projects/services/projects/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.fetchProjects();
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  createProject(@Body() projectData: CreateProjectDto) {
    return this.projectsService.createProject(projectData);
  }
}

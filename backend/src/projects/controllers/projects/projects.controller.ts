import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from 'src/projects/dtos/CreateProject.dto';
import { DeleteProjectDto } from 'src/projects/dtos/DeleteProject.dto';
import { FetchProjectDetailsDto } from 'src/projects/dtos/FetchProjectDetails.dto';
import { ProjectsService } from 'src/projects/services/projects/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.fetchProjects();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getProjectDetails(@Param('id', ParseIntPipe) id: number) {
    const dto: FetchProjectDetailsDto = { id };
    return this.projectsService.fetchProjectDetails(dto);
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  createProject(@Body() projectData: CreateProjectDto) {
    return this.projectsService.createProject(projectData);
  }

  @Delete('')
  @UsePipes(new ValidationPipe())
  deleteProject(@Body() projectData: DeleteProjectDto) {
    return this.projectsService.deleteProject(projectData.id);
  }
}

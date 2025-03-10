import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectDto } from 'src/projects/dtos/CreateProject.dto';

@Controller('projects')
export class ProjectsController {
  @Get()
  getProjects() {
    return {
      msg: 'Projects',
    };
  }

  @Post('new')
  createProject(@Body() projectData: CreateProjectDto) {
    console.log(projectData.name);
    return {};
  }
}

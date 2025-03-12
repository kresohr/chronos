import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from 'src/projects/dtos/CreateProject.dto';

@Controller('projects')
export class ProjectsController {
  @Get()
  getProjects() {
    return {
      msg: 'Projects',
    };
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  createProject(@Body() projectData: CreateProjectDto) {
    console.log(projectData.name);
    return {};
  }
}

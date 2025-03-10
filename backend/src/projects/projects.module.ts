import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects/projects.controller';

@Module({
  controllers: [ProjectsController]
})
export class ProjectsModule {}

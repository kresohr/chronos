import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects/projects.controller';
import { ProjectsService } from './services/projects/projects.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

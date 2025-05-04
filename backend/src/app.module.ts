import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { EmployeesModule } from './employees/employees.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    HealthModule,
    PrismaModule,
    ProjectsModule,
    EmployeesModule,
    RolesModule,
    UsersModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

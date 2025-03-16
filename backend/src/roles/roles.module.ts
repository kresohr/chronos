import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolesController } from './controllers/roles/roles.controller';
import { RolesService } from './services/roles/roles.service';

@Module({
  imports: [PrismaModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}

import { Module } from '@nestjs/common';
import { EntriesController } from './controllers/entries.controller';
import { EntriesService } from './services/entries.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}

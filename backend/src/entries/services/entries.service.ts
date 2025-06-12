import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FetchEmployeeEntriesDto } from '../dtos/FetchEmployeeEntries.dto';
import { CreateEntryDto } from '../dtos/CreateEntry.dto';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  async fetchEntriesForUser(data: FetchEmployeeEntriesDto) {
    return this.prisma.entry.findMany({
      where: {
        userId: data.userId,
      },
      select: {
        userId: true,
        timeLogged: true,
        projectId: true,
        updatedAt: true,
      },
    });
  }

  async createLog(data: CreateEntryDto) {
    return this.prisma.entry.create({ data });
  }
}

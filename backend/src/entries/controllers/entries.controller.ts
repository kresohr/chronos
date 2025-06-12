import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EntriesService } from '../services/entries.service';
import { FetchEmployeeEntriesDto } from '../dtos/FetchEmployeeEntries.dto';
import { CreateEntryDto } from '../dtos/CreateEntry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getEntries(@Param('id', ParseIntPipe) userId: number) {
    const dto: FetchEmployeeEntriesDto = { userId };
    return this.entriesService.fetchEntriesForUser(dto);
  }

  @Post('/new')
  @UsePipes(new ValidationPipe())
  createEntry(@Body() entryData: CreateEntryDto) {
    return this.entriesService.createLog(entryData);
  }
}

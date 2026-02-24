import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    try {
      const data = this.filmsService.findAll();
      return data;
    } catch (err) {
      throw err;
    }
  }

  @Get(':id/schedule')
  async findScheduleById(@Param('id') id: string) {
    try {
      const data = this.filmsService.findScheduleById(id);
      return data;
    } catch (err) {
      throw err;
    }
  }
}

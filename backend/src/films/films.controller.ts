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
  async findScheduleByFilmId(@Param('id') id: string) {
    try {
      const data = this.filmsService.findScheduleByFilmId(id);
      return data;
    } catch (err) {
      throw err;
    }
  }
}

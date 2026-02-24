import { Controller, Get } from '@nestjs/common';
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
  findScheduleById(): string {
    return 'Получили расписание для фильма с id';
  }
}

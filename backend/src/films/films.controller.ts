import { Controller, Get } from '@nestjs/common';

@Controller('films')
export class FilmsController {
  @Get()
  findAll(): string {
    return 'Получили список всех фильмов';
  }

  @Get(':id/schedule')
  findScheduleById(): string {
    return 'Получили расписание для фильма с id';
  }
}

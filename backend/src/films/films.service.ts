import { Injectable } from '@nestjs/common';
import { GetFilmScheduleDto, GetFilmsDto } from './dto/films.dto';
import { AppRepository } from 'src/app.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: AppRepository) {}

  async findAll(): Promise<GetFilmsDto> {
    const items = await this.filmsRepository.findAll();
    return {
      total: items.length,
      items: items,
    };
  }

  async findScheduleByFilmId(id: string): Promise<GetFilmScheduleDto> {
    const items = await this.filmsRepository.findScheduleByFilmId(id);
    return {
      total: items.length,
      items: items,
    };
  }
}

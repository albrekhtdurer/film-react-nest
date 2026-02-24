import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';
import { GetFilmScheduleDto, GetFilmsDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}

  async findAll(): Promise<GetFilmsDto> {
    const items = await this.filmsRepository.findAll();
    return {
      total: items.length,
      items: items,
    };
  }

  async findScheduleById(id: string): Promise<GetFilmScheduleDto> {
    const items = await this.filmsRepository.findScheduleById(id);
    console.log(items);
    return {
      total: items.length,
      items: items,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';
import { GetFilmsDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}

  async findAll(): Promise<GetFilmsDto> {
    const items = await this.filmsRepository.findAll();
    console.log(items.length);
    return {
      total: items.length,
      items: items,
    };
  }
}

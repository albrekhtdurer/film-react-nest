import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GetFilmDto, IFilmSchedule } from 'src/films/dto/films.dto';

const ScheduleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  daytime: { type: String, required: true },
  hall: { type: Number, required: true },
  rows: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const FilmSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  director: { type: Number, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: [ScheduleSchema], required: true },
});

@Injectable()
export class FilmsMongoDbRepository {
  constructor(@InjectModel('Film') private filmModel) {}
  private getFilmMapperFn(): (Film) => GetFilmDto {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        title: root.title,
        about: root.about,
        description: root.description,
        image: root.image,
        cover: root.cover,
        tags: root.tags,
      };
    };
  }

  async findAll(): Promise<GetFilmDto[]> {
    const items = await this.filmModel.find({});
    return items.map(this.getFilmMapperFn());
  }

  async findScheduleById(id: string): Promise<IFilmSchedule[]> {
    const film = await this.filmModel.findOne({ id: id });
    console.log(film);
    return film.schedule;
  }
}

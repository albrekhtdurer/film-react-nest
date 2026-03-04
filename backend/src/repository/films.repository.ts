import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GetFilmDto, IFilmSchedule } from 'src/films/dto/films.dto';

const ScheduleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: Number, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String] },
  },
  //{ _id: false },
);

export const FilmSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  director: { type: String, required: true },
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

  async findScheduleByFilmId(id: string): Promise<IFilmSchedule[]> {
    const film = await this.filmModel.findOne({ id: id });
    return film.schedule;
  }

  async findScheduleAndUpdateTaken(
    filmId: string,
    sessionId: string,
    taken: string,
  ): Promise<IFilmSchedule[]> {
    const film = await this.filmModel.findOne({
      id: filmId,
      'schedule.id': sessionId,
    });
    const sessionIndex = film.schedule.findIndex((session) => {
      return session.id === sessionId;
    });
    if (film.schedule[sessionIndex].taken?.length > 0) {
      film.schedule[sessionIndex].taken.push(taken);
    } else {
      film.schedule[sessionIndex].taken = [taken];
    }
    await film.save();
    return film;
  }
}

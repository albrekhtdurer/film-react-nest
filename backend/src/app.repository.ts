import { Injectable } from '@nestjs/common';
import { GetFilmDto, IFilmSchedule } from 'src/films/dto/films.dto';
import { Film } from './films/entities/film.entity';
import { Schedule } from './films/entities/schedule.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'node:crypto';

@Injectable()
export class AppRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}
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
        tags: root.tags.split(','),
      };
    };
  }

  private getScheduleMapperFn(): (Schedule) => IFilmSchedule {
    return (root) => {
      return {
        id: root.id,
        daytime: root.daytime,
        hall: root.hall,
        rows: root.rows,
        seats: root.seats,
        price: root.price,
        taken: root.taken.split(','),
      };
    };
  }

  async findAll(): Promise<GetFilmDto[]> {
    console.log('жопа');
    const items = await this.filmRepository.find();
    console.log(items);
    return items.map(this.getFilmMapperFn());
  }

  async findScheduleByFilmId(id: string): Promise<IFilmSchedule[]> {
    const schedule = await this.scheduleRepository.find({
      where: { filmId: id as UUID },
    });
    return schedule.map(this.getScheduleMapperFn());
  }

  async findScheduleAndUpdateTaken(
    filmId: string,
    sessionId: string,
    taken: string,
  ): Promise<IFilmSchedule[]> {
    const schedule = await this.scheduleRepository.find({
      where: { filmId: filmId as UUID, id: sessionId as UUID },
    });
    const sessionIndex = schedule.findIndex((session) => {
      return session.id === sessionId;
    });
    const currentSchedule = schedule[sessionIndex];
    if (currentSchedule.taken?.length > 0) {
      const takenArray = currentSchedule.taken.split(',');
      takenArray.push(taken);
      const newTaken = takenArray.join(',');
      currentSchedule.taken = newTaken;
    } else {
      currentSchedule.taken = taken;
    }
    await this.scheduleRepository.save(schedule);
    return schedule.map(this.getScheduleMapperFn());
  }
}

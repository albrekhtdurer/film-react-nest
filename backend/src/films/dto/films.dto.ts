export class GetFilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export class GetFilmsDto {
  total: number;
  items: GetFilmDto[];
}

export interface IFilmSchedule {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class GetFilmScheduleDto {
  total: number;
  items: IFilmSchedule[];
}

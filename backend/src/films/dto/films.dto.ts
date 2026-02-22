//TODO описать DTO для запросов к /films
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

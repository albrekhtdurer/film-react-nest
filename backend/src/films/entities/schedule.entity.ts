import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Film } from './film.entity';
import { UUID } from 'node:crypto';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column()
  taken: string;

  @Column()
  filmId: UUID;

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}

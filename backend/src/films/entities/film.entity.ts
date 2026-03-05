import { UUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Schedule } from './schedule.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  rating: number;

  @Column()
  director: string;

  @Column()
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  about: string;

  @OneToMany(() => Schedule, (schedule) => schedule.filmId)
  schedule: Schedule[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Schedule } from './schedule.entity';
import { UUID } from 'node:crypto';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  rating: number;

  @Column()
  director: string;

  @Column()
  title: string;

  @Column()
  tags: string;

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}

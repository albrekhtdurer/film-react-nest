import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { AppRepository } from '../app.repository';

describe('FilmsController', () => {
  let controller: FilmsController;
  const mockedFilmsData = [
    {
      id: '1',
      rating: 2.9,
      director: 'Итан Райт',
      tags: ['Документальный'],
      title: 'Архитекторы общества',
      about:
        'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
      description:
        'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
      image: '/images/bg1s.jpg',
      cover: '/images/bg1c.jpg',
    },
    {
      id: '1',
      rating: 2.9,
      director: 'Итан Райт',
      tags: ['Документальный'],
      title: 'Архитекторы общества',
      about:
        'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
      description:
        'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
      image: '/images/bg1s.jpg',
      cover: '/images/bg1c.jpg',
    },
  ];

  const mockedScheduleData = [
    {
      id: '1',
      daytime: '2023-05-29T10:30:00.001Z',
      hall: '2',
      rows: 5,
      seats: 10,
      price: 350,
      taken: ['1:2', '1:2'],
    },
    {
      id: '2',
      daytime: '2023-05-29T10:30:00.001Z',
      hall: '2',
      rows: 5,
      seats: 10,
      price: 350,
      taken: ['1:2', '1:2'],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: AppRepository,
          useValue: {
            findAll: jest.fn(() => mockedFilmsData),
            findScheduleByFilmId: jest.fn((id) =>
              mockedScheduleData.filter((schedule) => schedule.id === id),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('.findAll() should get all films', async () => {
    const data = await controller.findAll();
    expect(data).toStrictEqual({
      total: mockedFilmsData.length,
      items: mockedFilmsData,
    });
  });

  it('findScheduleByFilmId() should get schedule by film id', async () => {
    const data = await controller.findScheduleByFilmId('1');
    const filteredMock = mockedScheduleData.filter(
      (schedule) => schedule.id === '1',
    );
    expect(data).toStrictEqual({
      total: filteredMock.length,
      items: filteredMock,
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { AppRepository } from '../app.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: AppRepository,
          useValue: {
            findAll: jest.fn(),
            findScheduleByFilmId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

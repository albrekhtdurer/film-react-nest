import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderData = {
    total: 2,
    items: [
      {
        film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
        daytime: '2023-05-29T10:30:00.001Z',
        row: 2,
        seat: 5,
        price: 350,
      },
      {
        film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        session: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
        daytime: '2023-05-29T10:30:00.001Z',
        row: 2,
        seat: 5,
        price: 350,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockReturnValueOnce(mockOrderData),
      })

      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('.createOrder() should call createOrder method of the service', async () => {
    const order = {
      email: 'fearnocait@gmail.com',
      phone: '+7(925)881-20-19',
      tickets: mockOrderData.items,
    };
    const data = await controller.createOrder(order);
    expect(service.createOrder).toHaveBeenCalledWith(mockOrderData.items);
    expect(data).toStrictEqual(mockOrderData);
  });
});

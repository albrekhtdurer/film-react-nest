import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { CreateOrderDto, CreateOrderResDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body(new ParseArrayPipe({ items: CreateOrderDto }))
    createOrderDtos: CreateOrderDto[],
  ): Promise<CreateOrderResDto> {
    const data = await this.orderService.createOrder(createOrderDtos);
    return data;
  }
}

import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderResDto, CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createOrder(
    @Body()
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResDto> {
    const data = await this.orderService.createOrder(createOrderDto.tickets);
    return data;
  }
}

import { Controller, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Post()
  createOrder(): string {
    return 'Создали заказ';
  }
}

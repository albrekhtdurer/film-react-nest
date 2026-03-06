import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketDto } from './dto/order.dto';
import { AppRepository } from 'src/app.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: AppRepository) {}

  private async getSessionInfos(orderItems: TicketDto[]) {
    const sessionInfos = [];
    for (const order of orderItems) {
      const filmData = await this.filmsRepository.findScheduleByFilmId(
        order.film,
      );
      const sessionData = filmData.find(
        (session) => session.id == order.session,
      );
      sessionInfos.push(sessionData);
    }
    return sessionInfos;
  }

  private isSeatTaken(seat: string, taken: string[]) {
    if (!taken || taken.length === 0) {
      return false;
    }
    return Boolean(taken.includes(seat));
  }

  private async isTakenSeatInOrder(orderItems: TicketDto[]) {
    const sessionInfos = await this.getSessionInfos(orderItems);
    let result = false;
    orderItems.forEach((item, index) => {
      const seat = `${item.row}:${item.seat}`;
      if (this.isSeatTaken(seat, sessionInfos[index].taken)) {
        result = true;
      }
    });
    return result;
  }

  async createOrder(orderItems: TicketDto[]) {
    if (await this.isTakenSeatInOrder(orderItems)) {
      throw new BadRequestException(
        'Нельзя создавать заказ с занятыми местами',
      );
    } else {
      for (const order of orderItems) {
        await this.filmsRepository.findScheduleAndUpdateTaken(
          order.film,
          order.session,
          `${order.row}:${order.seat}`,
        );
      }
      return {
        total: orderItems.length,
        items: orderItems,
      };
    }
  }
}

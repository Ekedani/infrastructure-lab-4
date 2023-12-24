import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketsService } from '../tickets.service';
import { FindOrdersDto } from '../dto/find-orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private ticketService: TicketsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.orderRepository.save(createOrderDto);
    try {
      for (const ticketId of createOrderDto.ticketIds) {
        await this.ticketService.addToOrder(ticketId, newOrder.id);
      }
    } catch (e) {
      await this.ticketService.removeOrder(newOrder.id);
      await this.orderRepository.remove(newOrder);
      throw e;
    }
    return newOrder;
  }

  findAll(findOrdersDto: FindOrdersDto) {
    return this.orderRepository.find({
      where: {
        viewerId: findOrdersDto.viewerId,
        createdAt: this.getWhereOrderCreatedAt(findOrdersDto),
      },
    });
  }

  findOne(id: string) {
    const order = this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order #${id} not found`);
    }
    return order;
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    await this.ticketService.removeOrder(id);
    return this.orderRepository.remove(order);
  }

  private getWhereOrderCreatedAt(findOrdersDto: FindOrdersDto) {
    const { createdBefore, createdAfter } = findOrdersDto;
    return createdBefore && createdAfter
      ? Between(createdAfter, createdBefore)
      : createdAfter
        ? MoreThanOrEqual(createdAfter)
        : createdBefore
          ? LessThanOrEqual(createdBefore)
          : undefined;
  }
}

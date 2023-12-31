import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { FindTicketsDto } from './dto/find-tickets.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  create(createTicketDto: CreateTicketDto) {
    return this.ticketRepository.save(createTicketDto);
  }

  createMany(createTicketsDto: CreateTicketsDto) {
    const tickets = createTicketsDto.tickets.map((ticket) =>
      this.create(ticket),
    );
    return Promise.all(tickets);
  }

  findAll(findTicketsDto: FindTicketsDto) {
    return this.ticketRepository.find({
      where: {
        orderId: findTicketsDto.orderId,
        startsAt: this.getWhereMovieStartsAt(findTicketsDto),
      },
    });
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket #${id} not found`);
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);
    return this.ticketRepository.save({ ...ticket, ...updateTicketDto });
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);
    return this.ticketRepository.remove(ticket);
  }

  async addToOrder(ticketId: string, orderId: string) {
    const ticket = await this.findOne(ticketId);
    if (ticket.orderId) {
      throw new Error('Ticket already reserved');
    }
    ticket.orderId = orderId;
    return this.ticketRepository.save(ticket);
  }

  async removeOrder(orderId: string) {
    const tickets = await this.ticketRepository.find({ where: { orderId } });
    tickets.forEach((ticket) => {
      ticket.orderId = null;
    });
    return this.ticketRepository.save(tickets);
  }

  private getWhereMovieStartsAt(findTicketsDto: FindTicketsDto) {
    const { createdBefore, createdAfter } = findTicketsDto;
    return createdBefore && createdAfter
      ? Between(createdAfter, createdBefore)
      : createdAfter
        ? MoreThanOrEqual(createdAfter)
        : createdBefore
          ? LessThanOrEqual(createdBefore)
          : undefined;
  }
}

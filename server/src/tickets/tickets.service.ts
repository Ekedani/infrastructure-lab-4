import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto, CreateTicketsDto } from './dto/create-tickets.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  findAll() {
    return this.ticketRepository.find();
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
}

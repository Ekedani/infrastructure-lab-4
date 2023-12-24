import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateTicketDto } from './create-ticket.dto';

export class CreateTicketsDto {
  @ApiProperty({
    description: 'The tickets to create',
    type: [CreateTicketDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateTicketDto)
  tickets: CreateTicketDto[];
}

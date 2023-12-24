import { ArrayNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the viewer',
  })
  @IsUUID('4')
  viewerId: string;

  @ApiProperty({
    description: 'The IDs of the tickets to order',
  })
  @IsUUID('4', { each: true })
  @ArrayNotEmpty()
  ticketIds: string[];
}

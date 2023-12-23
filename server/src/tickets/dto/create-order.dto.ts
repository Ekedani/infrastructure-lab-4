import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsUUID('4')
  viewerId: string;

  @ApiProperty()
  @IsUUID('4', { each: true })
  ticketIds: string[];
}

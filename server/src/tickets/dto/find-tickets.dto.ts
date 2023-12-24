import { IsDateString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindTicketsDto {
  @ApiProperty({
    description: 'The ID of the order the ticket belongs to',
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID('4')
  orderId?: string;

  @ApiProperty({
    description: 'The date after which planned movie starts',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdAfter?: Date;

  @ApiProperty({
    description: 'The date before which planned movie starts',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdBefore?: Date;
}

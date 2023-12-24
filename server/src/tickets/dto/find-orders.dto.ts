import { IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOrdersDto {
  @ApiProperty({
    description: 'The ID of the viewer',
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  viewerId?: string;

  @ApiProperty({
    description: 'The date after which the order was created',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdAfter?: Date;

  @ApiProperty({
    description: 'The date before which the order was created',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdBefore?: Date;
}

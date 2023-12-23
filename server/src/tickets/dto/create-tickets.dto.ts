import {
  IsDateString,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  @IsDateString()
  startDatetime: Date;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(200)
  seat: number;

  @ApiProperty()
  @IsString()
  @Length(1, 255)
  movieTitle: string;
}

export class CreateTicketsDto {
  tickets: CreateTicketDto[];
}

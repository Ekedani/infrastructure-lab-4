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
  @ApiProperty({
    description: 'The start date and time of the movie',
  })
  @IsDateString()
  startDatetime: Date;

  @ApiProperty({
    description: 'The seat number',
    minimum: 1,
    maximum: 200,
  })
  @IsInt()
  @Min(1)
  @Max(200)
  seat: number;

  @ApiProperty({
    description: 'The title of the movie',
  })
  @IsString()
  @Length(1, 255)
  movieTitle: string;
}

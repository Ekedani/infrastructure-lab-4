import {
  IsDateString,
  IsIn,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  @ApiProperty({
    description: 'The first name of the seller',
    minLength: 2,
    maxLength: 35,
  })
  @IsString()
  @Length(2, 35)
  firstName: string;

  @ApiProperty({
    description: 'The last name of the seller',
    minLength: 2,
    maxLength: 35,
  })
  @IsString()
  @Length(2, 35)
  lastName: string;

  @ApiProperty({
    description: 'The birth date of the seller',
    type: 'string',
    format: 'date',
  })
  @IsDateString()
  @MaxLength(10)
  birthDate: Date;

  @ApiProperty({
    description: 'Gender of the seller',
    enum: ['male', 'female'],
  })
  @IsString()
  @IsIn(['male', 'female'])
  gender: string;
}

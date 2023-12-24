import { IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindSellersDto {
  @ApiProperty({
    description: 'The first name of the seller',
    required: false,
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'The last name of the seller',
    required: false,
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'The gender of the seller',
    required: false,
    enum: ['male', 'female'],
  })
  @IsOptional()
  @IsIn(['male', 'female'])
  gender?: string;
}

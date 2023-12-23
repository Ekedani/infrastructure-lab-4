import { IsDateString, IsIn, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  @ApiProperty()
  @IsString()
  @Length(2, 35)
  firstName: string;

  @ApiProperty()
  @IsString()
  @Length(2, 35)
  lastName: string;

  @ApiProperty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  @IsIn(['male', 'female'])
  gender: string;
}

import { IsDate, IsIn, IsString } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;
}

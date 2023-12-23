import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIDPipe.pipe';
import { ApiTags } from '@nestjs/swagger';
import { Seller } from './schemas/seller.schema';

@ApiTags('Sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  create(@Body() createSellerDto: CreateSellerDto): Promise<Seller> {
    return this.sellersService.create(createSellerDto);
  }

  @Get()
  findAll(): Promise<Seller[]> {
    return this.sellersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<Seller> {
    return this.sellersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ): Promise<Seller> {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string): Promise<Seller> {
    return this.sellersService.remove(id);
  }
}

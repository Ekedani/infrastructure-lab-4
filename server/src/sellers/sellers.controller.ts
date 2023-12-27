import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIDPipe.pipe';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Seller } from './schemas/seller.schema';
import { FindSellersDto } from './dto/find-sellers.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';

@ApiTags('Sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  create(@Body() createSellerDto: CreateSellerDto): Promise<Seller> {
    return this.sellersService.create(createSellerDto);
  }

  @Get()
  findAll(@Query() findSellersDto: FindSellersDto): Promise<Seller[]> {
    return this.sellersService.findAll(findSellersDto);
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

  @Put(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Seller image upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Image file (jpg, jpeg, png, or gif)',
        },
      },
    },
  })
  updateImage(
    @Param('id', ParseObjectIdPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(jpg|jpeg|png|gif)' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.sellersService.updateImage(id, image);
  }

  @Get(':id/image')
  async getImage(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const { path, format } = await this.sellersService.getImage(id);
    res.setHeader('Content-Type', format);
    const imageStream = createReadStream(`./uploads/${path}`);
    return new StreamableFile(imageStream);
  }
}

import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { CreateViewerDto } from './dto/create-viewer.dto';
import { UpdateViewerDto } from './dto/update-viewer.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Viewers')
@Controller('viewers')
export class ViewersController {
  constructor(private readonly viewersService: ViewersService) {}

  @Post()
  create(@Body() createViewerDto: CreateViewerDto) {
    return this.viewersService.create(createViewerDto);
  }

  @Get()
  findAll() {
    return this.viewersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.viewersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateViewerDto: UpdateViewerDto,
  ) {
    return this.viewersService.update(id, updateViewerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.viewersService.remove(id);
  }

  @Put(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Viewer image upload',
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
  async uploadViewerImage(
    @Param('id', ParseUUIDPipe) id: string,
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
    await this.viewersService.updateViewerImage(id, image);
  }

  @Get(':id/image')
  async getViewerImage(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const image = await this.viewersService.getViewerImage(id);
    res.set({ 'Content-Type': image.format });
    return new StreamableFile(image.data);
  }
}

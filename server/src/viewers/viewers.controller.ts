import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { CreateViewerDto } from './dto/create-viewer.dto';
import { UpdateViewerDto } from './dto/update-viewer.dto';
import { ApiTags } from '@nestjs/swagger';

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
}

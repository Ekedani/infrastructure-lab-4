import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateViewerDto } from './dto/create-viewer.dto';
import { UpdateViewerDto } from './dto/update-viewer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Viewer } from './entities/viewer.entity';
import { Repository } from 'typeorm';
import { ViewerImage } from './entities/viewer-image.entity';

@Injectable()
export class ViewersService {
  constructor(
    @InjectRepository(Viewer) private viewerRepository: Repository<Viewer>,
    @InjectRepository(ViewerImage)
    private viewerImageRepository: Repository<ViewerImage>,
  ) {}

  create(createViewerDto: CreateViewerDto): Promise<Viewer> {
    return this.viewerRepository.save(createViewerDto);
  }

  findAll(): Promise<Viewer[]> {
    return this.viewerRepository.find();
  }

  async findOne(id: string): Promise<Viewer> {
    const viewer = await this.viewerRepository.findOne({
      where: { id },
    });
    if (!viewer) {
      throw new NotFoundException(`Viewer #${id} not found`);
    }
    return viewer;
  }

  async update(id: string, updateViewerDto: UpdateViewerDto) {
    const viewer = await this.findOne(id);
    return this.viewerRepository.save({ ...viewer, ...updateViewerDto });
  }

  async remove(id: string) {
    const viewer = await this.findOne(id);
    return this.viewerRepository.remove(viewer);
  }

  async getViewerImage(id: string) {
    const viewerImage = await this.viewerImageRepository.findOne({
      where: { viewerId: id },
    });
    if (!viewerImage) {
      throw new NotFoundException(`Viewer #${id} not found`);
    }
    return viewerImage;
  }

  async updateViewerImage(id: string, image: Express.Multer.File) {
    try {
      const viewerImage = await this.getViewerImage(id);
      viewerImage.data = image.buffer;
      viewerImage.format = image.mimetype;
      return this.viewerImageRepository.save(viewerImage);
    } catch (e) {
      if (e instanceof NotFoundException) {
        return this.viewerImageRepository.save({
          viewerId: id,
          data: image.buffer,
          format: image.mimetype,
        });
      }
      throw e;
    }
  }
}

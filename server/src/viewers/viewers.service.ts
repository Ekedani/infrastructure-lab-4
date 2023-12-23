import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateViewerDto } from './dto/create-viewer.dto';
import { UpdateViewerDto } from './dto/update-viewer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Viewer } from './entities/viewer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ViewersService {
  constructor(
    @InjectRepository(Viewer) private viewerRepository: Repository<Viewer>,
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
}

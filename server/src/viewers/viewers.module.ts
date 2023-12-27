import { Module } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ViewersController } from './viewers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viewer } from './entities/viewer.entity';
import { ViewerImage } from './entities/viewer-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viewer, ViewerImage])],
  controllers: [ViewersController],
  providers: [ViewersService],
})
export class ViewersModule {}

import { Module } from '@nestjs/common';
import { ViewersService } from './viewers.service';
import { ViewersController } from './viewers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viewer } from './entities/viewer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viewer])],
  controllers: [ViewersController],
  providers: [ViewersService],
})
export class ViewersModule {}

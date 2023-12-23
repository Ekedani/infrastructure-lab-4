import { PartialType } from '@nestjs/swagger';
import { CreateViewerDto } from './create-viewer.dto';

export class UpdateViewerDto extends PartialType(CreateViewerDto) {}

import { Module } from '@nestjs/common';
import { TrailService } from './trail.service';
import { TrailResolver } from './trail.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trail } from './entities/trail.entity';
import { Content } from 'src/content/entities/content.entity';
import { ContentService } from 'src/content/content.service';
import { MediaService } from 'src/media/media.service';
import { Media } from 'src/media/entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trail, Content, Media])],
  providers: [TrailResolver, TrailService, ContentService, MediaService],
})
export class TrailModule {}

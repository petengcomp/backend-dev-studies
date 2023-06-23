import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Trail } from 'src/trail/entities/trail.entity';
import { Media } from 'src/media/entities/media.entity';
import { MediaService } from 'src/media/media.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Trail, Media])],
  providers: [ContentService, ContentResolver, MediaService],
})
export class ContentModule {}

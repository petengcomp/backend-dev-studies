import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Trail } from 'src/trail/entities/trail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Trail])],
  providers: [ContentService, ContentResolver],
})
export class ContentModule {}

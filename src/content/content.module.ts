import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Trail } from 'src/trail/trail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Trail])],
  providers: [ContentService, ContentResolver],
})
export class ContentModule {}

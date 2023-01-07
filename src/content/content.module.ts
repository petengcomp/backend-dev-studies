import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  providers: [ContentService, ContentResolver],
})
export class ContentModule {}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { CreateContentInput } from './dto/create-content.input';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async getAllContent(): Promise<Content[]> {
    const contents = await this.contentRepository.find();
    return contents;
  }

  async createContent(data: CreateContentInput): Promise<Content> {
    const content = this.contentRepository.create(data);
    const contentSaved = await this.contentRepository.save(content);

    if (!contentSaved) {
      throw new InternalServerErrorException('Problema ao criar Conteúdo');
    }

    return contentSaved;
  }
}

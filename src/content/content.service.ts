import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';
import { MediaService } from 'src/media/media.service';
import { Media } from 'src/media/entities/media.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    private readonly mediaService: MediaService,
  ) {}

  async getAllContent(): Promise<Content[]> {
    const contents = await this.contentRepository.find({
      relations: ['trail', 'media'],
    });
    return contents;
  }

  async createContent(data: CreateContentInput): Promise<Content> {
    const content = this.contentRepository.create(data);
    const contentSaved = await this.contentRepository.save(content);

    if (!contentSaved) {
      throw new InternalServerErrorException('Problema ao criar conteúdo');
    }

    return contentSaved;
  }

  async getContentById(id: string): Promise<Content> {
    const content = this.contentRepository.findOne({
      where: { id },
    });
    if (!content) {
      throw new InternalServerErrorException(
        'Esse id não tem nenhum conteúdo associado',
      );
    }
    return content;
  }

  async updateContentById(
    id: string,
    data: CreateContentInput,
  ): Promise<Content> {
    const foundContent = this.contentRepository.findOne({
      where: { id },
    });
    if (!foundContent) {
      throw new InternalServerErrorException(
        'Esse id não tem nenhum conteúdo associado',
      );
    }
    const newContent = await this.contentRepository.update(id, data);
    if (!newContent) {
      throw new InternalServerErrorException('Problema ao atualizar conteúdo');
    }
    return foundContent;
  }

  async deleteContentById(id: string) {
    const content = this.contentRepository.findOne({
      where: { id },
    });
    if (!content) {
      throw new NotFoundException('Esse id não tem nenhum conteúdo associado');
    }

    const deletedContent = await this.contentRepository.delete(id);
    if (!deletedContent) {
      throw new InternalServerErrorException('Problema ao deletar conteúdo');
    }

    return content;
  }

  async addMediaByContentId(contentId: string, mediaId: string) {
    const content: Content = await this.contentRepository.findOne({
      where: { id: contentId },
      relations: ['media'],
    });

    if (!Content)
      throw new InternalServerErrorException(
        'Não foi possível achar este conteúdo',
      );

    const media: Media = await this.mediaService.findOne(mediaId);
    content.media.push(media);

    const updatedContent = await this.contentRepository.save(content);
    if (!updatedContent)
      throw new InternalServerErrorException(
        'Não foi possível inserir a mídia',
      );

    return updatedContent;
  }
}

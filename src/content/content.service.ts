import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      throw new InternalServerErrorException('Problema ao criar conteúdo');
    }

    return contentSaved;
  }

  async getContentById(id: string): Promise<Content> {
    const content = this.contentRepository.findOne({
      where: { id },
    });
    if (!content) {
      throw new NotFoundException('Esse id não tem nenhum conteúdo associado');
    }
    return content;
  }

  async updateContentById(
    id: string,
    data: CreateContentInput,
  ): Promise<Content> {
    const content = this.contentRepository.findOne({
      where: { id },
    });
    if (!content) {
      throw new NotFoundException('Esse id não tem nenhum conteúdo associado');
    }
    const newContent = await this.contentRepository.update(id, data);
    if (!newContent) {
      throw new InternalServerErrorException('Problema ao atualizar conteúdo');
    }
    return {
      ...data,
      id,
    };
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
}

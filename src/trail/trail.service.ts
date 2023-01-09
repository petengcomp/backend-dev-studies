import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/content/entities/content.entity';
import { Repository } from 'typeorm';
import { CreateTrailInput } from './dto/create-trail.input';
import { Trail } from './entities/trail.entity';

@Injectable()
export class TrailService {
  constructor(
    @InjectRepository(Trail)
    private trailRepository: Repository<Trail>,
  ) {}

  async createTrail(data: CreateTrailInput): Promise<Trail> {
    const trail = this.trailRepository.create(data);
    const savedTrail = await this.trailRepository.save(trail);

    if (!savedTrail) {
      throw new InternalServerErrorException('Problema ao criar trilha');
    }

    return savedTrail;
  }

  async getAllTrails(): Promise<Trail[]> {
    const trails = await this.trailRepository.find();
    return trails;
  }

  async getTrailById(id: string): Promise<Trail> {
    const trail = await this.trailRepository.findOne({
      where: { id },
    });

    if (!trail) {
      throw new NotFoundException('Nenhuma trilha associada a esse id');
    }

    return trail;
  }

  async updateTrailById(id: string, data: CreateTrailInput): Promise<Trail> {
    const foundTrail = await this.trailRepository.findOne({
      where: { id },
    });

    if (!foundTrail) {
      throw new NotFoundException('Nenhuma trilha associada a esse id');
    }

    const updatedTrail = await this.trailRepository.update(id, data);
    if (!updatedTrail) {
      throw new InternalServerErrorException('Problema ao atualizar trilha');
    }

    return foundTrail;
  }

  async deleteTrailById(id: string): Promise<Trail> {
    const foundTrail = await this.trailRepository.findOne({
      where: { id },
    });
    if (!foundTrail) {
      throw new NotFoundException('Nenhuma trilha associada a esse id');
    }

    await this.trailRepository.delete(id);

    return foundTrail;
  }

  async addContentByTrailId(id: string, content: Content): Promise<Trail> {
    const foundTrail = await this.trailRepository.findOne({
      where: { id },
    });
    if (!foundTrail) {
      throw new NotFoundException('Nenhuma trilha associada a esse id');
    }

    foundTrail.contents.push(content);

    const updatedTrail = await this.trailRepository.update(id, foundTrail);
    if (!updatedTrail) {
      throw new InternalServerErrorException(
        'Problema ao adicionar conteúdo na trilha',
      );
    }

    return foundTrail;
  }
}

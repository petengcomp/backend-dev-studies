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
import { ContentService } from 'src/content/content.service';

@Injectable()
export class TrailService {
  constructor(
    @InjectRepository(Trail)
    private trailRepository: Repository<Trail>,
    private readonly contentService: ContentService
  ) {}

  // =========================================================== //
  async createTrail(data: CreateTrailInput): Promise<Trail> {
    const trail = this.trailRepository.create(data);
    const savedTrail = await this.trailRepository.save(trail);

    if (!savedTrail) {
      throw new InternalServerErrorException('Problema ao criar trilha');
    }
    return savedTrail;
  }

  // =========================================================== //
  async getAllTrails(): Promise<Trail[]> {
    const trails = await this.trailRepository.find({relations: ["contents"]});
    return trails;
  }

  // =========================================================== //
  async getTrailById(id: string): Promise<Trail> {
    const trail = await this.trailRepository.findOne({
      where: { id },
      relations: ["contents"]
    });

    if (!trail) {
      throw new NotFoundException('Nenhuma trilha associada a esse id');
    }
    return trail;
  }

  // =========================================================== //
  async updateTrailById(id: string, data: CreateTrailInput): Promise<Trail> {
    const foundTrail = await this.trailRepository.findOne({
      where: { id: id },
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

  // =========================================================== //
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

  // =========================================================== //
  async addContentByTrailId(trailId: string, contentId: string): Promise<Trail> {
    let foundTrail: Trail = await this.trailRepository.findOne({
      where: { id: trailId }, relations: ["contents"],
    });
    if (!foundTrail) {
      throw new NotFoundException('Could not found trail');
    }

    const foundContent: Content = await this.contentService.getContentById(contentId);
    if(!foundContent){
      throw new NotFoundException('Could not found content');
    }

    foundTrail.contents.push(foundContent);
    
    const updatedTrail = await this.trailRepository.save(foundTrail);
    if (!updatedTrail) {
      throw new InternalServerErrorException('Could not update trail');
    }
    return foundTrail;
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMediaInput } from './dto/create-media.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {

  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>
  ){}

  async create(createMediaInput: CreateMediaInput): Promise<Media> {
    const media = this.mediaRepository.create(createMediaInput);
    const  savedMedia = await this.mediaRepository.save(media);

    if(!savedMedia){
      throw new InternalServerErrorException("Problema ao criar mídia");
    }
    return savedMedia;
  }

  async findAll() {
    return await this.mediaRepository.find({relations: ["content"]});
  }

  async findOne(id: string) {    
    const media = this.mediaRepository.findOne({where: { id }});
    if(!media)
      throw new InternalServerErrorException("Não existe mídia com esse id associado")
    return media;
  }

  async remove(id: string) {
    const media = await this.mediaRepository.findOne({where: { id }})
    if(!media)
      throw new InternalServerErrorException("Não existe mídia com esse id associado")
  
    const deletedContent = await this.mediaRepository.delete(id);
    if(!deletedContent)
      throw new InternalServerErrorException("Não foi possível deletar mídia")

    return deletedContent;
  }
}

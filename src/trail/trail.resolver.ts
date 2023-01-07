import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TrailService } from './trail.service';
import { Trail } from './trail.entity';
import { CreateTrailInput } from './dto/create-trail.input';
import { Content } from 'src/content/content.entity';

@Resolver(() => Trail)
export class TrailResolver {
  constructor(private readonly trailService: TrailService) {}

  @Mutation(() => Trail)
  async createTrail(@Args('data') data: CreateTrailInput): Promise<Trail> {
    return await this.trailService.createTrail(data);
  }

  @Query(() => [Trail])
  async getAllTrails(): Promise<Trail[]> {
    return await this.trailService.getAllTrails();
  }

  @Query(() => Trail)
  async getTrailById(@Args('id') id: string): Promise<Trail> {
    return await this.trailService.getTrailById(id);
  }

  @Mutation(() => Trail)
  async updateTrailById(
    @Args('id') id: string,
    @Args('data') data: CreateTrailInput,
  ): Promise<Trail> {
    return await this.trailService.updateTrailById(id, data);
  }

  @Mutation(() => Trail)
  async deleteTrailById(@Args('id') id: string): Promise<Trail> {
    return await this.trailService.deleteTrailById(id);
  }

  // @Mutation(() => Trail)
  // async addContentByTrailId(
  //   @Args('id') id: string,
  //   @Args('content') content: Content,
  // ): Promise<Trail> {
  //   return await this.trailService.addContentByTrailId(id, content);
  // }
}

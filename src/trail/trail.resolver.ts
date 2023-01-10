import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TrailService } from './trail.service';
import { Trail } from './entities/trail.entity';
import { CreateTrailInput } from './dto/create-trail.input';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard, Roles } from 'src/auth/role.guard';

@Resolver(() => Trail)
export class TrailResolver {
  constructor(private readonly trailService: TrailService) {}

  @Mutation(() => Trail)
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
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
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  async updateTrailById(
    @Args('id') id: string,
    @Args('data') data: CreateTrailInput,
  ): Promise<Trail> {
    return await this.trailService.updateTrailById(id, data);
  }

  @Mutation(() => Trail)
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
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

// We can comment Guards row to test resolvers################
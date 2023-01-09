import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Content } from './entities/content.entity';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/create-content.input';

@Resolver()
export class ContentResolver {
  constructor(private contentService: ContentService) {}

  @Query(() => [Content])
  async getAllContent(): Promise<Content[]> {
    return await this.contentService.getAllContent();
  }

  @Mutation(() => Content)
  async createContent(
    @Args('data') data: CreateContentInput,
  ): Promise<Content> {
    return await this.contentService.createContent(data);
  }

  @Query(() => Content)
  async getContentById(@Args('id') id: string): Promise<Content> {
    return await this.contentService.getContentById(id);
  }

  @Mutation(() => Content)
  async updateContentById(
    @Args('id') id: string,
    @Args('data') data: CreateContentInput,
  ): Promise<Content> {
    return await this.contentService.updateContentById(id, data);
  }

  @Mutation(() => Content)
  async deleteContentById(@Args('id') id: string): Promise<Content> {
    return await this.contentService.deleteContentById(id);
  }
}

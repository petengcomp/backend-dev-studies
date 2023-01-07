import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/create-content.input';

@Resolver()
export class ContentResolver {
  constructor(private contentService: ContentService) {}

  @Query(() => [Content])
  async getAllContent(): Promise<Content[]> {
    const contents = await this.contentService.getAllContent();
    return contents;
  }

  @Mutation(() => Content)
  async createContent(
    @Args('data') data: CreateContentInput,
  ): Promise<Content> {
    const content = await this.contentService.createContent(data);
    return content;
  }

  @Query(() => Content)
  async getContentById(@Args('id') id: string): Promise<Content> {
    const content = await this.contentService.getContentById(id);
    return content;
  }

  @Mutation(() => Content)
  async updateContentById(
    @Args('id') id: string,
    @Args('data') data: CreateContentInput,
  ): Promise<Content> {
    const content = await this.contentService.updateContentById(id, data);
    return content;
  }

  @Mutation(() => Content)
  async deleteContentById(@Args('id') id: string): Promise<Content> {
    const content = await this.contentService.deleteContentById(id);
    return content;
  }
}

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
}

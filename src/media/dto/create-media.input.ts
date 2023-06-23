import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMediaInput {
  
  @Field(() => String)
  link: string

  @Field(() => String)
  description: string
}

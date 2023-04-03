import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTrailInput {
  
  @Field({nullable: false})
  name: string;
}

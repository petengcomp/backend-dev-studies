import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ContentType {
  VIDEO = 'video',
  SLIDE = 'slide',
  BOOK = 'book',
}

registerEnumType(ContentType, {
  name: 'ContentType',
});

@ObjectType()
@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  name: string;

  @Field((type) => ContentType)
  @Column()
  type: ContentType;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  link: string;

  @Field()
  @Column()
  date: Date;
}

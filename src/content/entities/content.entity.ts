import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Media } from 'src/media/entities/media.entity';
import { Trail } from 'src/trail/entities/trail.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ContentType {
  VIDEO = 'video',
  SLIDE = 'slide',
  BOOK = 'book',
  LINK = 'link',
}

registerEnumType(ContentType, {
  name: 'ContentType',
});

@ObjectType()
@Entity()
export class Content {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  title: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  subject: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  type: ContentType;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  // @Field(() => String, { nullable: false })
  // @Column({nullable: false})
  // content: string;

  @Field(() => Trail, { nullable: false })
  @ManyToOne(() => Trail, (trail) => trail.contents)
  trail: Trail;

  @Field(() => [Media])
  @OneToMany(() => Media, (media) => media.content)
  media: Media[];

  @Field(() => Date)
  @CreateDateColumn()
  createadDate: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedDate: Date;
}

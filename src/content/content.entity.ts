import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { Trail } from 'src/trail/trail.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  id: string;

  @Column()
  name: string;

  @Column()
  type: ContentType;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column()
  date: Date;

  @ManyToOne(() => Trail, (trail) => trail.contents)
  trail: Trail;
}

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Content } from 'src/content/entities/content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum TrailType {
  BEGINNER = 'beginner',
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  DEVOPS = 'devops',
  MOBILE = 'mobile',
}

registerEnumType(TrailType, {
  name: 'TrailType',
});

@ObjectType()
@Entity()
export class Trail {

  @Field(type => Int, {description: "Primary Id"})
  @PrimaryGeneratedColumn()
  id: string;

  @Field({description: "Trail name", nullable: false})
  @Column()
  name: string;

  @Field(type => TrailType,{description: "Trail type (Check possible values)", nullable: false})
  @Column()
  type: TrailType;

  // É necessário criar um enum??
  @Field({description: "must be: youtube/book/slide"})
  @Column()
  stack: string;
  // ========================= //

  @Field({description: "Short description for trail"})
  @Column()
  description: string;

  @Field(type => Content, {description: "Trail's content", nullable: true})
  @OneToMany(() => Content, (content) => content.trail)
  contents: Content[];
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Content } from 'src/content/entities/content.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType() //typegraphql decorator
@Entity() //typeorm decorator
export class Trail {
  @Field(() => String, { description: 'Primary Id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'Trail name', nullable: false })
  @Column({ nullable: false, unique: true })
  name: string;

  @Field(() => [Content], { description: "Trail's contents", nullable: true })
  @OneToMany(() => Content, (content) => content.trail)
  contents: Content[];

  @Field(() => Date)
  @CreateDateColumn()
  createadDate: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedDate: Date;
}

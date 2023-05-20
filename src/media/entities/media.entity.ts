import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Content } from 'src/content/entities/content.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Media {
  
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string

  @Field(() => String)
  @Column({nullable: false})
  link: string

  @Field(() => String)
  @Column({nullable: false})
  description: string

  @Field(() => Content)
  @ManyToOne(() => Content, (content) => content.media)
  content: Content

  @Field(() => Date)
  @CreateDateColumn()
  createadDate: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updatedDate: Date
}

import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { Content } from 'src/content/content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum TrailType {
  INICIANTES = 'iniciantes',
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  DEVOPS = 'devops',
}

registerEnumType(TrailType, {
  name: 'TrailType',
});

@ObjectType()
@Entity()
export class Trail {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: TrailType;

  @Column()
  stack: string;

  @Column()
  description: string;

  @OneToMany(() => Content, (content) => content.trail)
  contents: Content[];
}

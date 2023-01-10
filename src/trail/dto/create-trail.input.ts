import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TrailType } from '../entities/trail.entity';

@InputType()
export class CreateTrailInput {
  
  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode ficar vazio' })
  name: string;

  @IsEnum(TrailType, {
    message:
      'Únicas opções aceitadas nesse campo: iniciantes/frontend/backend/devops',
  })
  @IsNotEmpty({
    message: 'Esse campo não pode ficar vazio',
  })
  type: TrailType;

  @IsNotEmpty({ message: 'Esse campo não pode ficar vazio' })
  stack: string;

  @IsNotEmpty({ message: 'Esse campo não pode ficar vazio' })
  description: string;
}

// Suggestions: Add @Field() decorator and check if these decorators are working fine 

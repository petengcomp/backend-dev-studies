import { InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ContentType } from '../entities/content.entity';

@InputType()
export class CreateContentInput {
  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode estar vazio' })
  name: string;

  @IsEnum(ContentType, {
    message: 'Únicas opções aceitadas nesse campo: video/slide/book',
  })
  @IsNotEmpty({
    message: 'Esse campo não pode estar vazio',
  })
  type: ContentType;

  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode estar vazio' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode estar vazio' })
  link: string;

  @IsDate()
  @IsNotEmpty({ message: 'Esse campo não pode estar vazio' })
  date: Date;
}

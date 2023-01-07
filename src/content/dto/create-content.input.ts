import { InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ContentType } from '../content.entity';

@InputType()
export class CreateContentInput {
  @IsString()
  @IsNotEmpty({ message: 'Esse campo não pode estar vazio' })
  name: string;

  @IsEnum(ContentType)
  @IsNotEmpty({
    message:
      'Esse campo não pode estar vazio, e nem ser diferente de video/slide/book]',
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

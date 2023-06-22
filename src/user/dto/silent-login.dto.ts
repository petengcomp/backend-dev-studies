import { IsNotEmpty } from 'class-validator';

export class SilentLoginDto {
  @IsNotEmpty()
  token: string;
}

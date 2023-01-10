import { PartialType } from '@nestjs/mapped-types';
import { CreateNormalUserDto } from './create-normal-user.dto';

export class UpdateUserDto extends PartialType(CreateNormalUserDto) {}

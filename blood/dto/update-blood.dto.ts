import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodDto } from './create-blood.dto';

export class UpdateBloodDto extends PartialType(CreateBloodDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodStatDto } from './create-blood-stat.dto';

export class UpdateBloodStatDto extends PartialType(CreateBloodStatDto) {}

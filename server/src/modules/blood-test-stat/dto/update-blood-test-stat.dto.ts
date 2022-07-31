import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodTestStatDto } from './create-blood-test-stat.dto';

export class UpdateBloodTestStatDto extends PartialType(CreateBloodTestStatDto) {}

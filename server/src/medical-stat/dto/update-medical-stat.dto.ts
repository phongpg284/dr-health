import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalStatDto } from './create-medical-stat.dto';

export class UpdateMedicalStatDto extends PartialType(CreateMedicalStatDto) {}

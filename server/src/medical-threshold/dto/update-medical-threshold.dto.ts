import { PartialType } from '@nestjs/swagger';
import { CreateMedicalThresholdDto } from './create-medical-threshold.dto';

export class UpdateMedicalThresholdDto extends PartialType(CreateMedicalThresholdDto) {}

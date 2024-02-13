import { PartialType } from '@nestjs/mapped-types';
import { BloodTest } from 'src/modules/blood-test/entities/blood-test.entity';
import { CreateMedicalRecordDto } from './create-medical-record.dto';

export class UpdateMedicalRecordDto extends PartialType(CreateMedicalRecordDto) {}

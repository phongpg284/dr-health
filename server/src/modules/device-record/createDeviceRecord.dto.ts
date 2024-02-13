import { MedicalRecord } from '../medical-record/entities/medical-record.entity';
import { PatientStats } from '../mqtt/transformers.ts/transformToDeviceStats';

export class CreateDeviceRecordDto extends PatientStats {
  medicalRecord: MedicalRecord;
}

export class UpdateDeviceRecordDto extends CreateDeviceRecordDto {}

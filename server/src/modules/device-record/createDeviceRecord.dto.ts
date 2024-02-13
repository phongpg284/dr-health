import { PatientStats } from '../mqtt/transformers.ts/transformToDeviceStats';
import { Patient } from '../patient/entities/patient.entity';

export class CreateDeviceRecordDto extends PatientStats {
  patient: Patient;
}

export class UpdateDeviceRecordDto extends CreateDeviceRecordDto {}

import { BloodTest } from 'src/modules/blood-test/entities/blood-test.entity';
import { DeviceRecord } from 'src/modules/device-record/device-record.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';

export class CreateMedicalRecordDto {
  patient: Patient;
  bloodTest?: BloodTest;
  deviceRecord?: DeviceRecord;
}

import { MedicineSchedule } from 'src/modules/prescription/dto/create-prescription.dto';
import { Prescription } from 'src/modules/prescription/entities/prescription.entity';

export interface CreateMedicinePrescriptionList {
  prescription: Prescription;
  schedules: MedicineSchedule[];
}

import { MedicineSchedule } from 'src/prescription/dto/create-prescription.dto';
import { Prescription } from 'src/prescription/entities/prescription.entity';

export interface CreateMedicinePrescriptionList {
  prescription: Prescription;
  schedules: MedicineSchedule[];
}

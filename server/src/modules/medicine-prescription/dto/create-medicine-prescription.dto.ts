import { Prescription } from 'src/modules/prescription/entities/prescription.entity';

export class CreateMedicinePrescriptionDto {
  prescription: Prescription;
  medicine: string;
  quantity: number;
  time: Date;
  startDateRange: Date;
  endDateRange: Date;
  note?: string;
}

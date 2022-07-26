import { Prescription } from 'src/prescription/entities/prescription.entity';

export class CreateMedicinePrescriptionDto {
  prescription: Prescription;
  medicine: string;
  quantity: number;
  time: Date;
  startDateRange: Date;
  endDateRange: Date;
  note?: string;
}

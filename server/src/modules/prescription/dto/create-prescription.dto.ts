export interface MedicineSchedule {
  name: string;
  note?: string;
  quantity: number;
  scheduleDateRange: [Date, Date];
  scheduleHours: Date[];
}

export class CreatePrescriptionDto {
  patientId: string;
  medicineSchedule?: MedicineSchedule[];
}

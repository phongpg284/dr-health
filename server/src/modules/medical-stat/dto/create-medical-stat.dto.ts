export class CreateMedicalStatDto {
  type!: string;
  unit?: string;
  value: number | string;
  secondValue?: number | string;
  patientId!: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CreateMedicalStatDto {
  type!: string;
  unit?: string;
  value: number | string;
  patientId!: number;
  createdAt?: Date;
  updatedAt?: Date;
}

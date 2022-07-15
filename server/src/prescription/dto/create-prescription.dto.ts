import { CreateMedicinePrescriptionDto } from 'src/medicine-prescription/dto/create-medicine-prescription.dto';

export class CreatePrescriptionDto {
  patientId: string;
  medicinePescriptions?: Omit<CreateMedicinePrescriptionDto, 'prescriptionId'>[];
}

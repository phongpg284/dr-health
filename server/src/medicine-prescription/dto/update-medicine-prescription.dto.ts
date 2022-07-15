import { PartialType } from '@nestjs/swagger';
import { CreateMedicinePrescriptionDto } from './create-medicine-prescription.dto';

export class UpdateMedicinePrescriptionDto extends PartialType(CreateMedicinePrescriptionDto) {}

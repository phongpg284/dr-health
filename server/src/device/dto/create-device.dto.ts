export class CreateDeviceDto {
  name!: string;
  type!: string;
  isConnect?: boolean;
  patientId: string;
}

export class CreateDeviceDto {
  name!: string;
  type!: string;
  code!: string;
  isConnect?: boolean;
  patientId: string;
}

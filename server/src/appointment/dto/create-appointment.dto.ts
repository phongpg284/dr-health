export class CreateAppointmentDto {
  patientId: string;
  doctorId: string;
  name: string;
  link: string;
  time: Date;
  duration: number;
}

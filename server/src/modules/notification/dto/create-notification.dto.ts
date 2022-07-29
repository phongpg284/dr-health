import { Appointment } from 'src/modules/appointment/entities/appointment.entity';

export class CreateNotificationDto {
  title: string;
  type?: string;
  content: string;
  userId?: number;
  patientId?: number;
  doctorId?: number;
  appoinment?: Appointment;
}

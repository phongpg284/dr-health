import { Appointment } from 'src/appointment/entities/appointment.entity';
import { MedicinePrescription } from 'src/medicine-prescription/entities/medicine-prescription.entity';
import { ScheduleType } from '../entities/schedule.entity';

export class CreateScheduleDto {
  userId: string;
  type: ScheduleType;
  time: Date;
  medicinePrescription?: MedicinePrescription;
  appointment?: Appointment;
}

import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { MedicinePrescription } from 'src/modules/medicine-prescription/entities/medicine-prescription.entity';
import { ScheduleType } from '../entities/schedule.entity';

export class CreateScheduleDto {
  userId: string;
  type: ScheduleType;
  time: Date;
  medicinePrescription?: MedicinePrescription;
  appointment?: Appointment;
}

import { MedicinePrescription } from 'src/medicine-prescription/entities/medicine-prescription.entity';
import { User } from 'src/user/entities/user.entity';

export interface ICreateScheduleFromMedicinePrescription {
  user: User;
  medicinePrescription: MedicinePrescription;
}

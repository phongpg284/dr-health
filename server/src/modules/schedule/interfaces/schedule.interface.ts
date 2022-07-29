import { MedicinePrescription } from 'src/modules/medicine-prescription/entities/medicine-prescription.entity';
import { User } from 'src/modules/user/entities/user.entity';

export interface ICreateScheduleFromMedicinePrescription {
  user: User;
  medicinePrescription: MedicinePrescription;
}

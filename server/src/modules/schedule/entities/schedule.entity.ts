import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { MedicinePrescription } from 'src/modules/medicine-prescription/entities/medicine-prescription.entity';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

export type ScheduleType = 'appointment' | 'medicine_prescription';

@Entity()
export class Schedule extends BaseEntity {
  constructor(
    user: User,
    type: ScheduleType,
    time: Date,
    medicinePrescription?: MedicinePrescription,
    appointment?: Appointment,
  ) {
    super();
    this.user = user;
    this.type = type;
    this.time = time;
    this.medicinePrescription = medicinePrescription;
    this.appointment = appointment;
  }

  @Property()
  time: Date;

  @ManyToOne(() => User)
  user: User;

  @Property()
  type: ScheduleType;

  @ManyToOne(() => Appointment, { nullable: true })
  appointment: Appointment;

  @ManyToOne(() => MedicinePrescription, { nullable: true })
  medicinePrescription: MedicinePrescription;
}

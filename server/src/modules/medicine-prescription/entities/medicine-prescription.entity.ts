import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { Prescription } from 'src/modules/prescription/entities/prescription.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class MedicinePrescription extends BaseEntity {
  constructor(
    prescription: Prescription,
    medicine: string,
    quantity: number,
    startDateRange: Date,
    endDateRange: Date,
    time: Date,
    note?: string,
  ) {
    super();
    this.prescription = prescription;
    this.medicine = medicine;
    this.quantity = quantity;
    this.time = time;
    this.startDateRange = startDateRange;
    this.endDateRange = endDateRange;
    this.note = note;
  }

  @Property()
  medicine: string;

  @Property()
  quantity: number;

  @Property({ nullable: true })
  note?: string;

  @Property()
  startDateRange: Date;

  @Property()
  endDateRange: Date;

  @Property()
  time: Date;

  @ManyToOne(() => Prescription)
  prescription: Prescription;

  @OneToMany(() => Schedule, (schedule) => schedule.medicinePrescription, { hidden: true })
  schedules = new Collection<Schedule>(this);
}

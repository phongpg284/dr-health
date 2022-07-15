import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class MedicinePrescription extends BaseEntity {
  constructor(prescription: Prescription, medicine: string, quantity: number, time: Date) {
    super();
    this.prescription = prescription;
    this.medicine = medicine;
    this.quantity = quantity;
    this.time = time;
  }

  @Property()
  medicine: string;

  @Property()
  quantity: number;

  @Property()
  time: Date;

  @ManyToOne(() => Prescription)
  prescription: Prescription;
}

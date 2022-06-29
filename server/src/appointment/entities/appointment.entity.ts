import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Appointment extends BaseEntity {
  constructor(patient: Patient, doctor: Doctor, name: string, date: Date, link: string, duration: number) {
    super();
    this.patient = patient;
    this.doctor = doctor;
    this.name = name;
    this.date = date;
    this.link = link;
    this.duration = duration;
  }

  @ManyToOne(() => Patient)
  patient: Patient;

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @Property({ default: 'Meeting' })
  name: string;

  @Property()
  date: Date;

  @Property()
  link: string;

  @Property()
  duration: number;
}

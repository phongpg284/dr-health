import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Appointment extends BaseEntity {
  constructor(patient: Patient, doctor: Doctor, name: string, time: Date, link: string, duration: number) {
    super();
    this.patient = patient;
    this.doctor = doctor;
    this.name = name;
    this.time = time;
    this.link = link;
    this.duration = duration;
  }

  @ManyToOne(() => Patient)
  patient: Patient;

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @OneToOne()
  schedule: Schedule;

  @Property({ default: 'Meeting' })
  name: string;

  @Property()
  time: Date;

  @Property()
  link: string;

  @Property()
  duration: number;
}

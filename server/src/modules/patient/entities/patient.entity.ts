import { Collection, Entity, ManyToOne, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { DeviceRecord } from 'src/modules/device-record/device-record.entity';
import { Device } from 'src/modules/device/entities/device.entity';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { MedicalRecord } from 'src/modules/medical-record/entities/medical-record.entity';
import { MedicalStat } from 'src/modules/medical-stat/entities/medical-stat.entity';
import { MedicalThreshold } from 'src/modules/medical-threshold/entities/medical-threshold.entity';
import { Prescription } from 'src/modules/prescription/entities/prescription.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Patient extends BaseEntity {
  constructor(account: User, doctor?: Doctor) {
    super();
    this.account = account;
    this.doctor = doctor;
    this.medicalThreshold = new MedicalThreshold();
    this.code = Math.random().toString(36).slice(2, 10);
  }

  @Property({ default: Math.random().toString(36).slice(2, 10) })
  code?: string;

  @OneToOne()
  account: User;

  @ManyToOne(() => Doctor, { nullable: true })
  doctor: Doctor;

  @OneToOne({ nullable: true, inversedBy: 'patient' })
  device: Device;

  @OneToOne({ nullable: true, inversedBy: 'patient', orphanRemoval: true })
  medicalThreshold: MedicalThreshold;

  @OneToMany(() => Prescription, (prescription) => prescription.patient, { hidden: true })
  prescriptions = new Collection<Prescription>(this);

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient, { hidden: true })
  medicalRecords = new Collection<MedicalRecord>(this);

  @OneToMany(() => MedicalStat, (medicalStat) => medicalStat.patient, { hidden: true })
  medicalStats = new Collection<MedicalStat>(this);

  @OneToMany(() => Appointment, (appointment) => appointment.patient, { hidden: true })
  appointments = new Collection<Appointment>(this);

  @OneToMany(() => DeviceRecord, (deviceRecord) => deviceRecord.patient, { hidden: false })
  deviceRecords = new Collection<DeviceRecord>(this);
}

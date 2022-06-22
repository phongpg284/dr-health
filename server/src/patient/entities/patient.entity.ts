import { Collection, Entity, ManyToOne, OneToMany, OneToOne } from '@mikro-orm/core';
import { Device } from 'src/device/entities/device.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { MedicalStat } from 'src/medical-stat/entities/medical-stat.entity';
import { MedicalThreshold } from 'src/medical-threshold/entities/medical-threshold.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Patient extends BaseEntity {
  constructor(account: User, doctor?: Doctor) {
    super();
    this.account = account;
    this.doctor = doctor;
    this.medicalThreshold = new MedicalThreshold();
  }

  @OneToOne()
  account: User;

  @ManyToOne(() => Doctor, { nullable: true })
  doctor: Doctor;

  @OneToOne({ nullable: true, inversedBy: 'patient' })
  device: Device;

  @OneToOne({ nullable: true, inversedBy: 'patient', orphanRemoval: true })
  medicalThreshold: MedicalThreshold;

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient, { hidden: true })
  medicalRecords = new Collection<MedicalRecord>(this);

  @OneToMany(() => MedicalStat, (medicalStat) => medicalStat.patient, { hidden: true })
  medicalStats = new Collection<MedicalStat>(this);
}

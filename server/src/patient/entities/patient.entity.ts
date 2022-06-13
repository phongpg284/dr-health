import { Collection, Entity, ManyToOne, OneToMany, OneToOne } from '@mikro-orm/core';
import { Device } from 'src/device/entities/device.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Patient extends BaseEntity {
  @OneToOne()
  account: User;

  @ManyToOne(() => Doctor, { nullable: true })
  doctor: Doctor;

  @OneToOne({ nullable: true })
  device: Device;

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  medicalRecords = new Collection<MedicalRecord>(this);
}

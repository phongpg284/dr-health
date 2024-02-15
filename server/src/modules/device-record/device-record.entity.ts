import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/utils/BaseEntity';
import { Patient } from '../patient/entities/patient.entity';

@Entity()
export class DeviceRecord extends BaseEntity {
  @ManyToOne()
  patient: Patient;

  @Property()
  heart_rate_bpm: number;

  @Property()
  spo2_percentage: number;

  @Property()
  temperature: number;
}

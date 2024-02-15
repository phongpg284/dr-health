import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/utils/BaseEntity';
import { Patient } from '../patient/entities/patient.entity';

@Entity()
export class DeviceRecord extends BaseEntity {
  @ManyToOne()
  patient: Patient;

  @Property()
  heart_beat_bpm: number;

  @Property()
  oxygen_percent: number;

  @Property()
  temperature: number;
}

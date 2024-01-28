import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { MedicalRecord } from 'src/modules/medical-record/entities/medical-record.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class DeviceRecord extends BaseEntity {
  @OneToOne()
  medicalRecord: MedicalRecord;

  @Property()
  heart_rate_bpm: number;

  @Property()
  spo2_percentage: number;

  @Property()
  temperature: number;
}

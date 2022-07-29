import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class MedicalThreshold extends BaseEntity {
  @OneToOne({ nullable: true, mappedBy: 'medicalThreshold' })
  patient: Patient;

  @Property({ default: 0 })
  spO2Threshold: number;

  @Property({ default: 0 })
  heartRateThreshold: number;

  @Property({ default: 0 })
  bodyTempThreshold: number;

  @Property({ default: 0 })
  diasHighThreshold: number;

  @Property({ default: 0 })
  diasLowThreshold: number;

  @Property({ default: 0 })
  sysHighThreshold: number;

  @Property({ default: 0 })
  sysLowThreshold: number;
}

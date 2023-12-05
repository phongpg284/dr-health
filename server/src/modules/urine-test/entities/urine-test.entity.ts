import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { MedicalRecord } from 'src/modules/medical-record/entities/medical-record.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class UrineTest extends BaseEntity {
  @OneToOne()
  medicalRecord: MedicalRecord;

  @Property()
  patientIdOnUrineDevice: string;

  @Property()
  gluValue: string;

  @Property()
  leuValue: string;

  @Property()
  nitValue: string;

  @Property()
  uroValue: string;

  @Property()
  proValue: string;

  @Property()
  phValue: string;

  @Property()
  bdValue: string;

  @Property()
  sgValue: string;

  @Property()
  ketValue: string;

  @Property()
  billValue: string;
}

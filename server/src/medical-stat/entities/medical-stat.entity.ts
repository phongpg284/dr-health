import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class MedicalStat extends BaseEntity {
  @Property()
  type: string;

  @Property()
  unit: string;

  @ManyToOne(() => MedicalRecord)
  medicalRecord: MedicalRecord;
}

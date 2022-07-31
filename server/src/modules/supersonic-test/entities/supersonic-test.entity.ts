import { Entity, OneToOne } from '@mikro-orm/core';
import { MedicalRecord } from 'src/modules/medical-record/entities/medical-record.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class SupersonicTest extends BaseEntity {
  @OneToOne()
  medicalRecord: MedicalRecord;
}

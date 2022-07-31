import { Entity, ManyToOne, OneToOne } from '@mikro-orm/core';
import { BloodTestStat } from 'src/modules/blood-test-stat/entities/blood-test-stat.entity';
import { MedicalRecord } from 'src/modules/medical-record/entities/medical-record.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class BloodTest extends BaseEntity {
  @OneToOne()
  medicalRecord: MedicalRecord;

  @ManyToOne(() => BloodTestStat)
  bloodTestStat: BloodTestStat;
}

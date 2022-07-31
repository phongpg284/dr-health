import { Collection, Entity, ManyToOne, OneToMany, OneToOne } from '@mikro-orm/core';
import { BloodTest } from 'src/modules/blood-test/entities/blood-test.entity';
import { MedicalStat } from 'src/modules/medical-stat/entities/medical-stat.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { SupersonicTest } from 'src/modules/supersonic-test/entities/supersonic-test.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class MedicalRecord extends BaseEntity {
  @ManyToOne(() => Patient)
  patient: Patient;

  @OneToOne()
  bloodTest: BloodTest;

  @OneToOne()
  supersonicTest: SupersonicTest;
}

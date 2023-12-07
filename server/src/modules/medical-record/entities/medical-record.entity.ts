import { Entity, ManyToOne, OneToOne } from '@mikro-orm/core';
import { BloodTest } from 'src/modules/blood-test/entities/blood-test.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { SupersonicTest } from 'src/modules/supersonic-test/entities/supersonic-test.entity';
import { UrineTest } from 'src/modules/urine-test/entities/urine-test.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class MedicalRecord extends BaseEntity {
  @ManyToOne(() => Patient)
  patient: Patient;

  @OneToOne()
  bloodTest: BloodTest;

  @OneToOne()
  supersonicTest: SupersonicTest;

  @OneToOne()
  urineTest: UrineTest;
}

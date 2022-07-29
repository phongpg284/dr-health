import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class MedicalStat extends BaseEntity {
  @Property()
  type!: string;

  @Property()
  value!: string | number;

  @Property({ nullable: true })
  secondValue?: string | number;

  @Property({ nullable: true })
  unit?: string;

  @ManyToOne(() => Patient)
  patient: Patient;
}

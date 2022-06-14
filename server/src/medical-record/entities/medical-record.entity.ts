import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { MedicalStat } from 'src/medical-stat/entities/medical-stat.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class MedicalRecord extends BaseEntity {
  @ManyToOne(() => Patient)
  patient: Patient;
}

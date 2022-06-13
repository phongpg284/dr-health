import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Patient } from 'src/patient/entities/patient.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Device extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  type!: string;

  @Property()
  code!: string;

  @OneToOne()
  patient: Patient;

  @Property({ default: false })
  isConnect: boolean;
}

import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Device extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  type!: string;

  @Property()
  code!: string;

  @OneToOne({ nullable: true, mappedBy: 'device' })
  patient: Patient;

  @Property({ default: false })
  isConnect: boolean;
}

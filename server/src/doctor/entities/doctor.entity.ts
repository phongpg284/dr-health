import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Patient } from 'src/patient/entities/patient.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Doctor extends BaseEntity {
  @OneToOne()
  account: User;

  @OneToMany(() => Patient, (patient) => patient.doctor)
  patients = new Collection<Patient>(this);

  @Property({ nullable: true })
  address?: string;

  @Property({ nullable: true })
  dob?: Date;
}

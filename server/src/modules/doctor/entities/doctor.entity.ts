import { Collection, Entity, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Doctor extends BaseEntity {
  constructor(account: User) {
    super();
    this.account = account;
  }
  @OneToOne()
  account: User;

  @OneToMany(() => Patient, (patient) => patient.doctor)
  patients = new Collection<Patient>(this);

  @Property({ nullable: true })
  department?: string;

  @Property({ nullable: true })
  degree?: string;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor, { hidden: true })
  appointments = new Collection<Appointment>(this);
}

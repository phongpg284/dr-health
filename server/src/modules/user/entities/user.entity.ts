import { Collection, Entity, OneToMany, OneToOne, Property, Unique } from '@mikro-orm/core';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import { Address } from 'src/modules/address/entities/address.entity';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { Notification } from 'src/modules/notification/entities/notification.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property({ default: 'Demo Full Name' })
  fullName!: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role!: string;

  @Property({ nullable: true })
  phone?: string;

  @Property({ nullable: true })
  gender?: string;

  @Property({ nullable: true })
  avatar?: string;

  @Property({ nullable: true })
  @Transform(({ value }) => {
    dayjs(value).toDate();
  })
  dob?: Date;

  @Property({ nullable: true })
  job?: string;

  @Property({ nullable: true })
  ethnic?: string;

  @OneToOne({ nullable: true, inversedBy: 'user' })
  address: Address;

  @Property({ nullable: true })
  nationality?: string;

  @Property({ nullable: true })
  identity?: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications = new Collection<Notification>(this);

  @OneToMany(() => Schedule, (schedule) => schedule.user, { hidden: true })
  schedules = new Collection<Schedule>(this);

  @OneToOne({ nullable: true })
  patient: Patient;

  @OneToOne({ nullable: true })
  doctor: Doctor;
}

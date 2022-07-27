import { Collection, Entity, OneToMany, OneToOne, Property, Unique } from '@mikro-orm/core';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import { Address } from 'src/address/entities/address.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
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
}

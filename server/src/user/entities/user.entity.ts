import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { Transform } from 'class-transformer';
import dayjs from 'dayjs';
import { Notification } from 'src/notification/entities/notification.entity';
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
  address?: string;

  @Property({ nullable: true })
  ward?: string;

  @Property({ nullable: true })
  district?: string;

  @Property({ nullable: true })
  province?: string;

  @Property({ nullable: true })
  ethnic?: string;

  @Property({ nullable: true })
  nationality?: string;

  @Property({ nullable: true })
  identity?: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications = new Collection<Notification>(this);
}

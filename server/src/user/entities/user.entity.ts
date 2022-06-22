import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { Notification } from 'src/notification/entities/notification.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

export class Address {
  street?: string;
  ward?: string;
  district?: string;
  province?: string;
}
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
  dob?: Date;

  @Property({ nullable: true })
  job?: string;

  @Property({ nullable: true })
  address?: Address;

  @Property({ nullable: true })
  ethnic?: string;

  @Property({ nullable: true })
  nationality?: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications = new Collection<Notification>(this);
}

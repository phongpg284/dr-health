import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Notification } from 'src/notification/entities/notification.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property({ default: 'Demo Full Name' })
  fullName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role!: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications = new Collection<Notification>(this);
}

import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Notification } from 'src/notification/entities/notification.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ nullable: true })
  role?: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications = new Collection<User>(this);
}

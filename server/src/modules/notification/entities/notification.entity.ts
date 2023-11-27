import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Notification extends BaseEntity {
  @Property()
  title!: string;

  @Property()
  content: string;

  @Property()
  status!: string;

  @Property()
  type: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Appointment, { nullable: true })
  appointment: Appointment;
}

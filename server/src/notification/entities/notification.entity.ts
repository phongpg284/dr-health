import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Notification extends BaseEntity {
  @Property()
  title!: string;

  @Property()
  content: string;

  @Property()
  status!: string;

  @ManyToOne(() => User)
  user: User;
}

import { Entity, Property } from '@mikro-orm/core';
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
}

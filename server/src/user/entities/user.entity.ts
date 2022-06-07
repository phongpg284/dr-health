import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property()
  title!: string;

  @Property()
  options!: [string];

  @Property()
  answer!: [number];

  @Property({ nullable: true })
  type?: string;

  @Property()
  point!: number;

  @Property()
  isMultiple!: boolean;

  @Property({ nullable: true })
  userAnswer?: [number];
}

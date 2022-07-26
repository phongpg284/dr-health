import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Medicine extends BaseEntity {
  constructor(name: string) {
    super();
    this.name = name;
  }

  @Property()
  name: string;
}

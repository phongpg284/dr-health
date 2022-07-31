import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Role } from 'src/modules/role/entities/role.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Permission extends BaseEntity {
  @Property()
  name: string;

  @Property()
  code: string;

  @Property()
  description: string;

  @ManyToOne(() => Role)
  role: Role;
}

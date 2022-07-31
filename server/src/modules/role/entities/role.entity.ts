import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Role extends BaseEntity {
  @Property()
  name: string;

  @Property()
  description: string;

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions = new Collection<Permission>(this);
}

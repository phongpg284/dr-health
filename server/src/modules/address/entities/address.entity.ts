import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Address extends BaseEntity {
  @OneToOne({ mappedBy: 'address' })
  user: User;

  @Property({ nullable: true })
  location?: string;

  @Property({ nullable: true })
  ward?: string;

  @Property({ nullable: true })
  wardCode?: number;

  @Property({ nullable: true })
  district?: string;

  @Property({ nullable: true })
  districtCode?: number;

  @Property({ nullable: true })
  province?: string;

  @Property({ nullable: true })
  provinceCode?: number;
}

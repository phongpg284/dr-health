import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BloodTestStat } from 'src/modules/blood-test-stat/entities/blood-test-stat.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class BloodStat extends BaseEntity {
  @Property()
  unit: string;

  @ManyToOne(() => BloodTestStat)
  bloodTestStat: BloodTestStat;
}

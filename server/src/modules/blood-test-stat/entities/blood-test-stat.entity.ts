import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BloodStat } from 'src/modules/blood-stat/entities/blood-stat.entity';
import { BloodTest } from 'src/modules/blood-test/entities/blood-test.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class BloodTestStat extends BaseEntity {
  @Property()
  value: number;

  @OneToMany(() => BloodTest, (bloodTest) => bloodTest.bloodTestStat)
  bloodTests = new Collection<BloodTest>(this);

  @OneToMany(() => BloodTest, (bloodStat) => bloodStat.bloodTestStat)
  bloodStats = new Collection<BloodStat>(this);
}

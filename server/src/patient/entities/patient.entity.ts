import { Entity, ManyToOne, OneToOne } from '@mikro-orm/core';
import { Device } from 'src/device/entities/device.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Patient extends BaseEntity {
  @OneToOne()
  account: User;

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @OneToOne()
  device: Device;
}

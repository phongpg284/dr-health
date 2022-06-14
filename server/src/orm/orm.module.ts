import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from 'src/user/entities/user.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Device } from 'src/device/entities/device.entity';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { MedicalStat } from 'src/medical-stat/entities/medical-stat.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [User, Patient, Doctor, Device, MedicalRecord, MedicalStat],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}

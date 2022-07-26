import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from 'src/user/entities/user.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Device } from 'src/device/entities/device.entity';
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { MedicalStat } from 'src/medical-stat/entities/medical-stat.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { MedicalThreshold } from 'src/medical-threshold/entities/medical-threshold.entity';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { MedicinePrescription } from 'src/medicine-prescription/entities/medicine-prescription.entity';
import { Address } from 'src/address/entities/address.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [
        User,
        Patient,
        Doctor,
        Device,
        MedicalRecord,
        MedicalStat,
        Notification,
        MedicalThreshold,
        Prescription,
        MedicinePrescription,
        Address,
        Appointment,
        Medicine,
        Schedule,
      ],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}

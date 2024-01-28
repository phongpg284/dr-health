import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from 'src/modules/user/entities/user.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { Device } from 'src/modules/device/entities/device.entity';
import { MedicalRecord } from 'src/modules/medical-record/entities/medical-record.entity';
import { MedicalStat } from 'src/modules/medical-stat/entities/medical-stat.entity';
import { Notification } from 'src/modules/notification/entities/notification.entity';
import { MedicalThreshold } from 'src/modules/medical-threshold/entities/medical-threshold.entity';
import { Prescription } from 'src/modules/prescription/entities/prescription.entity';
import { MedicinePrescription } from 'src/modules/medicine-prescription/entities/medicine-prescription.entity';
import { Address } from 'src/modules/address/entities/address.entity';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { Medicine } from 'src/modules/medicine/entities/medicine.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { DeviceRecord } from 'src/modules/device-record/device-record.entity';
import { UrineTest } from 'src/modules/urine-test/entities/urine-test.entity';

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
        DeviceRecord,
        UrineTest,
      ],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}

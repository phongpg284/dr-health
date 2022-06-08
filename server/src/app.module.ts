import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './orm/orm.module';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { DeviceModule } from './device/device.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { MedicalStatModule } from './medical-stat/medical-stat.module';

@Module({
  imports: [
    OrmModule,
    UserModule,
    DoctorModule,
    PatientModule,
    DeviceModule,
    MedicalRecordModule,
    MedicalStatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

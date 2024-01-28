import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OrmModule } from './orm/orm.module';
import { UserModule } from './modules/user/user.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { DeviceModule } from './modules/device/device.module';
import { MedicalRecordModule } from './modules/medical-record/medical-record.module';
import { MedicalStatModule } from './modules/medical-stat/medical-stat.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { redisConfig } from './config/redis';
import { NotificationModule } from './modules/notification/notification.module';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { EventsModule } from './events/events.module';
import { MedicalThresholdModule } from './modules/medical-threshold/medical-threshold.module';
import { PrescriptionModule } from './modules/prescription/prescription.module';
import { MedicinePrescriptionModule } from './modules/medicine-prescription/medicine-prescription.module';
import { AddressModule } from './modules/address/address.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { MedicineModule } from './modules/medicine/medicine.module';
import { BloodStatModule } from './modules/blood-stat/blood-stat.module';
import { DeviceRecordModule } from './modules/device-record/device-record.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TokenModule,
    RedisModule.forRoot(redisConfig),
    OrmModule,
    AuthModule,
    UserModule,
    DoctorModule,
    PatientModule,
    DeviceModule,
    MedicalRecordModule,
    MedicalStatModule,
    NotificationModule,
    MqttModule,
    EventsModule,
    MedicalThresholdModule,
    PrescriptionModule,
    MedicinePrescriptionModule,
    AddressModule,
    AppointmentModule,
    ScheduleModule,
    MedicineModule,
    BloodStatModule,
    DeviceRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

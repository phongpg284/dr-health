import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OrmModule } from './orm/orm.module';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { DeviceModule } from './device/device.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { MedicalStatModule } from './medical-stat/medical-stat.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { options } from './config/redis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrmModule,
    UserModule,
    DoctorModule,
    PatientModule,
    DeviceModule,
    MedicalRecordModule,
    MedicalStatModule,
    TokenModule,
    AuthModule,
    RedisModule.forRoot({
      config: options,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
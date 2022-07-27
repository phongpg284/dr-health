import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { OrmModule } from 'src/orm/orm.module';
import { PatientModule } from 'src/patient/patient.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [OrmModule, PatientModule, DoctorModule, NotificationModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}

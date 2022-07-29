import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { OrmModule } from 'src/orm/orm.module';
import { PatientModule } from 'src/modules/patient/patient.module';
import { DoctorModule } from 'src/modules/doctor/doctor.module';
import { NotificationModule } from 'src/modules/notification/notification.module';

@Module({
  imports: [OrmModule, PatientModule, DoctorModule, NotificationModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}

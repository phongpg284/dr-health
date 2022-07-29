import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OrmModule } from 'src/orm/orm.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { PatientModule } from 'src/modules/patient/patient.module';
import { ScheduleModule } from 'src/modules/schedule/schedule.module';

@Module({
  imports: [OrmModule, NotificationModule, PatientModule, ScheduleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

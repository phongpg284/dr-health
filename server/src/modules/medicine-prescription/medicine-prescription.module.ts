import { Module } from '@nestjs/common';
import { MedicinePrescriptionService } from './medicine-prescription.service';
import { MedicinePrescriptionController } from './medicine-prescription.controller';
import { PrescriptionModule } from 'src/modules/prescription/prescription.module';
import { OrmModule } from 'src/orm/orm.module';
import { ScheduleModule } from 'src/modules/schedule/schedule.module';

@Module({
  imports: [OrmModule, ScheduleModule],
  controllers: [MedicinePrescriptionController],
  providers: [MedicinePrescriptionService],
  exports: [MedicinePrescriptionService],
})
export class MedicinePrescriptionModule {}

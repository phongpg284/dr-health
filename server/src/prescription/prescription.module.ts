import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { OrmModule } from 'src/orm/orm.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [OrmModule, PatientModule],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports: [PrescriptionService],
})
export class PrescriptionModule {}

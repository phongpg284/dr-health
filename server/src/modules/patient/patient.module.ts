import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { OrmModule } from 'src/orm/orm.module';
import { MedicalThresholdModule } from 'src/modules/medical-threshold/medical-threshold.module';
import { PrescriptionService } from 'src/modules/prescription/prescription.service';

@Module({
  imports: [OrmModule, MedicalThresholdModule],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}

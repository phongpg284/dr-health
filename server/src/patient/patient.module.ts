import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { OrmModule } from 'src/orm/orm.module';
import { MedicalThresholdModule } from 'src/medical-threshold/medical-threshold.module';
import { PrescriptionService } from 'src/prescription/prescription.service';

@Module({
  imports: [OrmModule, MedicalThresholdModule],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}

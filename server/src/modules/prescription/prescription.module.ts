import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { OrmModule } from 'src/orm/orm.module';
import { PatientModule } from 'src/modules/patient/patient.module';
import { MedicinePrescriptionModule } from 'src/modules/medicine-prescription/medicine-prescription.module';

@Module({
  imports: [OrmModule, PatientModule, MedicinePrescriptionModule],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports: [PrescriptionService],
})
export class PrescriptionModule {}

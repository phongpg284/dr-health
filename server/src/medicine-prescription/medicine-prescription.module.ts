import { Module } from '@nestjs/common';
import { MedicinePrescriptionService } from './medicine-prescription.service';
import { MedicinePrescriptionController } from './medicine-prescription.controller';
import { PrescriptionModule } from 'src/prescription/prescription.module';
import { OrmModule } from 'src/orm/orm.module';

@Module({
  imports: [OrmModule, PrescriptionModule],
  controllers: [MedicinePrescriptionController],
  providers: [MedicinePrescriptionService],
})
export class MedicinePrescriptionModule {}

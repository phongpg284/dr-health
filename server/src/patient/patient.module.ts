import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { OrmModule } from 'src/orm/orm.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [OrmModule, EventsModule],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}

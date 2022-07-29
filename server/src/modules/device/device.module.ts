import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { PatientModule } from 'src/modules/patient/patient.module';
import { OrmModule } from 'src/orm/orm.module';

@Module({
  imports: [OrmModule, PatientModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}

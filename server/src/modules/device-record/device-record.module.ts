import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm/orm.module';
import { MedicalRecordModule } from '../medical-record/medical-record.module';
import { DeviceRecordController } from './device-record.controller';
import { DeviceRecordService } from './device-record.service';

@Module({
  imports: [OrmModule, MedicalRecordModule],
  controllers: [DeviceRecordController],
  providers: [DeviceRecordService],
  exports: [DeviceRecordService],
})
export class DeviceRecordModule {}

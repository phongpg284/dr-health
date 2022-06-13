import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Device } from './entities/device.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Patient, Device],
    }),
    PatientModule,
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}

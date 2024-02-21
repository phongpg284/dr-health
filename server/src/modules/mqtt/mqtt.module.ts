import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { DeviceModule } from 'src/modules/device/device.module';
import { PatientModule } from 'src/modules/patient/patient.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { OrmModule } from 'src/orm/orm.module';
import { MedicalStatModule } from 'src/modules/medical-stat/medical-stat.module';
import { EventsModule } from 'src/events/events.module';
import { MQTT_BROKER } from 'src/config';
import { DeviceRecordModule } from '../device-record/device-record.module';
import { MedicalRecordModule } from '../medical-record/medical-record.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: MQTT_BROKER,
        },
      },
    ]),
    OrmModule,
    DeviceModule,
    PatientModule,
    NotificationModule,
    MedicalStatModule,
    EventsModule,
    DeviceRecordModule,
    MedicalRecordModule,
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}

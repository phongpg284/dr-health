import { Injectable, Logger } from '@nestjs/common';
import {
  BLOOD_PRESS,
  BODY_TEMP,
  DEVICE_STATS,
  DIASTOLE,
  HEART_RATE,
  HUMIDITY,
  SPO2,
  SYSTOLIC,
  TEMPERATURE,
} from 'src/config/topic';
import { MEDICAL_STATS } from 'src/constant/enums';
import { EventsGateway } from 'src/events/events.gateway';
import { DeviceService } from 'src/modules/device/device.service';
import { MedicalStatService } from 'src/modules/medical-stat/medical-stat.service';
import { NotificationService } from 'src/modules/notification/notification.service';
import { PatientService } from 'src/modules/patient/patient.service';
import { topicParse, topicValueParse } from 'src/utils/topicParse';
import { DeviceRecordService } from '../device-record/device-record.service';
import { MedicalRecordService } from '../medical-record/medical-record.service';
import { transformToPatientStats } from './transformers.ts/transformToDeviceStats';

@Injectable()
export class MqttService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly patientService: PatientService,
    private readonly notificationService: NotificationService,
    private readonly medicalStatService: MedicalStatService,
    private readonly eventGateway: EventsGateway,
    private readonly deviceRecordService: DeviceRecordService,
    private readonly medicalRecordService: MedicalRecordService,
  ) {}
  handleMQTTNodeTopic = async (topic: string, payload: any) => {
    console.log('payloadddd', payload);
    console.log('topic', topic);
    const [isValidTopic, nodeBrand, deviceCode, nodeType, nodeStat] = topicParse(topic);
    console.log('isValidTopic, nodeBrand, deviceCode, nodeType, nodeStat', {
      isValidTopic,
      nodeBrand,
      deviceCode,
      nodeType,
      nodeStat,
    });
    if (!isValidTopic) {
      Logger.error('Failed topic parse!');
      return;
    }
    const device = await this.deviceService.findOne({ code: deviceCode });
    console.log('nodeStat', nodeStat);
    // console.log('tes', device);
    if (!device) {
      Logger.error('No device found with this code!');
      return;
    }
    const patient = device.patient;
    // console.log('test', patient);
    if (!patient) {
      Logger.error('No patient connect with this device!');
      return;
    }
    const filterErrorValue = (key: string, value: string) => {
      if (parseFloat(value) === 0) {
        const randomStats = {
          SpO2: [95, 99],
          Heart_Rate: [64, 100],
          Body_Temp: [36, 38],
          diastole: [80, 90],
          systolic: [80, 90],
        };

        const min = (randomStats as any)?.[key]?.[0] || 0;
        const max = (randomStats as any)?.[key]?.[1] || 100;

        const result = min + (max - min) * Math.random();
        if (key === 'Body_Temp') return Math.round(parseFloat(result) * 1e2) / 1e2;

        return Math.round(parseFloat(result));
      }
      if (key === 'Body_Temp') return Math.round(parseFloat(value) * 1e2) / 1e2;

      return Math.round(parseFloat(value));
    };

    switch (nodeStat) {
      case TEMPERATURE:
        await this.medicalStatService.create({
          patientId: patient.id,
          type: MEDICAL_STATS[SPO2].type,
          value: filterErrorValue(nodeStat, payload),
        });
        break;
      case HUMIDITY:
        await this.medicalStatService.create({
          patientId: patient.id,
          type: MEDICAL_STATS[HUMIDITY].type,
          value: filterErrorValue(nodeStat, payload),
        });
        break;
      case SPO2:
        await this.medicalStatService.create({
          patientId: patient.id,
          type: MEDICAL_STATS[SPO2].type,
          value: filterErrorValue(nodeStat, payload),
        });
        break;
      case HEART_RATE:
        await this.medicalStatService.create({
          patientId: patient.id,
          type: MEDICAL_STATS[HEART_RATE].type,
          value: filterErrorValue(nodeStat, payload),
        });
        break;
      case BODY_TEMP:
        await this.medicalStatService.create({
          patientId: patient.id,
          type: MEDICAL_STATS[BODY_TEMP].type,
          value: filterErrorValue(nodeStat, payload),
        });
        break;
      case BLOOD_PRESS:
        const values = topicValueParse(payload);
        await this.medicalStatService.create({
          patientId: patient.id,
          type: MEDICAL_STATS[BLOOD_PRESS].type,
          value: values.value,
          secondValue: values.secondValue,
        });
        break;
      case SYSTOLIC:
        await this.medicalStatService.create({
          patientId: patient.id,
          type: MEDICAL_STATS[SYSTOLIC].type,
          value: filterErrorValue(nodeStat, payload),
        });
        break;
      case DEVICE_STATS:
        const isValidData =
          payload?.heart_beat_bpm && payload?.oxygen_percent && payload?.temperature;

        if (isValidData) {
          const deviceStats = transformToPatientStats(payload);
          const patientObj = await this.patientService.findOne({ id: patient.id });
          await this.deviceRecordService.create({
            patient: patientObj,
            ...deviceStats,
          });
          const heartBeatThreshold = 150;
          const oxygenPercentageThreshold = 94;
          const temperatureMaxThreshold = 37.5;
          const temperatureMinThreshold = 36.5;

          const content = [];
          if (deviceStats.heart_beat_bpm > heartBeatThreshold) {
            content.push('Nhịp tim cao');
          } else if (deviceStats.oxygen_percent < oxygenPercentageThreshold) {
            content.push('Nồng độ oxy máu thấp');
          } else if (deviceStats.temperature > temperatureMaxThreshold) {
            content.push('Nhiệt độ cơ thể cao, bạn có nguy cơ bị sốt');
          } else if (deviceStats.temperature < temperatureMinThreshold) {
            content.push('Nhiệt độ cơ thể thấp, bạn có thể đang cảm lạnh');
          }

          if (content.length) {
            const notifcations = await Promise.all(
              content.map((message) => {
                return this.notificationService.create({
                  patientId: patient.id,
                  userId: patient.account.id,
                  title: 'Threshold exceeded',
                  content: message,
                });
              }),
            );
            console.log('notifcations', notifcations);
            notifcations.forEach((notification) => {
              this.eventGateway.sendNotification(notification);
            });
          }
          await this.eventGateway.sendDeviceStats(payload);
        }
        // console.log('payload', payload);
        break;
    }
  };
}

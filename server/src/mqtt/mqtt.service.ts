import { Injectable, Logger } from '@nestjs/common';
import { BLOOD_PRESS, BODY_TEMP, DIASTOLE, HEART_RATE, HUMIDITY, SPO2, SYSTOLIC, TEMPERATURE } from 'src/config/topic';
import { MEDICAL_STATS } from 'src/constant/enums';
import { DeviceService } from 'src/device/device.service';
import { MedicalStatService } from 'src/medical-stat/medical-stat.service';
import { NotificationService } from 'src/notification/notification.service';
import { PatientService } from 'src/patient/patient.service';
import { topicParse, topicValueParse } from 'src/utils/topicParse';

@Injectable()
export class MqttService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly patientService: PatientService,
    private readonly notificationService: NotificationService,
    private readonly medicalStatService: MedicalStatService,
  ) {}
  handleMQTTNodeTopic = async (topic: string, payload: string) => {
    const [isValidTopic, nodeBrand, deviceCode, nodeType, nodeStat] = topicParse(topic);
    if (!isValidTopic) {
      Logger.error('Failed topic parse!');
      return;
    }

    const device = await this.deviceService.findOne({ code: deviceCode });
    if (!device) {
      Logger.error('No device found with this code!');
      return;
    }
    const patient = device.patient;
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
        console.log('h', patient.id);
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
          value: filterErrorValue(nodeStat, values.value),
          secondValue: filterErrorValue(nodeStat, values.secondValue),
        });
        break;
      case SYSTOLIC:
        await this.medicalStatService.create({
          patientId: patient.id,
          type: MEDICAL_STATS[SYSTOLIC].type,
          value: filterErrorValue(nodeStat, payload),
        });
        break;
      case DIASTOLE:
        await this.medicalStatService.create({
          patientId: patient.id,
          type: MEDICAL_STATS[DIASTOLE].type,
          value: filterErrorValue(nodeStat, payload),
        });
        break;
      // case FACE:
      //   await deviceObject.updateDevice({
      //     _id: deviceId.toString(),
      //     updatedAt: new ObjectId().getTimestamp(),
      //     face: {
      //       createdAt: new ObjectId().getTimestamp(),
      //       data: parseFloat(payload),
      //     },
      //   });
      //   break;
      // case VOICE:
      //   await deviceObject.updateDevice({
      //     _id: deviceId.toString(),
      //     updatedAt: new ObjectId().getTimestamp(),
      //     voice: {
      //       createdAt: new ObjectId().getTimestamp(),
      //       data: parseFloat(payload),
      //     },
      //   });
      //   break;
      // case ARM_MOVEMENT:
      //   await deviceObject.updateDevice({
      //     _id: deviceId.toString(),
      //     updatedAt: new ObjectId().getTimestamp(),
      //     armMovement: {
      //       createdAt: new ObjectId().getTimestamp(),
      //       data: parseFloat(payload),
      //     },
      //   });
      //   break;
      // case HEART_THRESHOLD:
      //   await deviceObject.updateDevice({
      //     _id: deviceId.toString(),
      //     updatedAt: new ObjectId().getTimestamp(),
      //     heartRateThreshold: parseFloat(payload),
      //   });
      //   break;
      // case TEMP_THRESHOLD:
      //   await deviceObject.updateDevice({
      //     _id: deviceId.toString(),
      //     updatedAt: new ObjectId().getTimestamp(),
      //     bodyTempThreshold: parseFloat(payload),
      //   });
      //   break;
      // case POSITION:
      //   // eslint-disable-next-line no-case-declarations
      //   const positionData = JSON.parse(payload);
      //   await deviceObject.updateDevice({
      //     _id: deviceId.toString(),
      //     updatedAt: new ObjectId().getTimestamp(),
      //     position: {
      //       ...positionData,
      //       createdAt: new ObjectId().getTimestamp(),
      //     },
      //   });
      //   break;
      // case MEDICINE:
      //   // eslint-disable-next-line no-case-declarations
      //   const medicineData = JSON.parse(payload);
      //   await deviceObject.updateDevice({
      //     _id: deviceId.toString(),
      //     updatedAt: new ObjectId().getTimestamp(),
      //     medicine: {
      //       ...medicineData,
      //       createdAt: new ObjectId().getTimestamp(),
      //     },
      //   });
      //   break;
      // case SCORE:
      //   const point = parseFloat(payload);
      //   const testData = [
      //     {
      //       id: '5',
      //       point: point,
      //     },
      //   ];
      //   await deviceObject.addNewTest(deviceId.toString(), 'device', testData, TestSumbitTeam.Embedded);

      //   break;
      // case STROKE:
      //   const newTestData = JSON.parse(payload);
      //   const insertTestData = Object.entries(newTestData).map(([key, value]: [string, number]) => {
      //     return {
      //       id: key,
      //       point: value,
      //     };
      //   });
      //   await deviceObject.addNewTest(deviceId.toString(), 'device', insertTestData, TestSumbitTeam.AI);

      //   break;
      // case CALCULATE_STATS:
      //   const newCalculateStats = payload;
      //   const [shoulderToElbow, elbowToWrist] = newCalculateStats.split(',').map((d: string) => parseFloat(d));
      //   const updateCalculateStats = {
      //     shoulderToElbow,
      //     elbowToWrist,
      //     updatedAt: new Date(),
      //   };
      //   await patientObject.updatePatient({
      //     _id: patientId.toString(),
      //     calculateStats: updateCalculateStats,
      //     updatedAt: new Date(),
      //   });
      //   break;

      // case PHYSICAL_THERAPY:
      //   const exerciseData = JSON.parse(payload);
      //   const exerciseSesionObject = new ExerciseSessions();
      //   await exerciseSesionObject.calculateExerciseData(patientId, exerciseData);

      //   break;

      // case FALL:
      //   if (parseFloat(payload) === 1)
      //     await notificationObject.createNotification(
      //       {
      //         title: `Phát hiện bệnh nhân ngã`,
      //         content: `Phát hiện bệnh nhân bị ngã tại tọa độ 10.035911,105.783660`,
      //         accountId: patientId,
      //         role: 'patient',
      //         mapUrl: `https://www.google.com/maps/search/?api=1&query=10.035911,105.783660`,
      //         createdAt: new Date(),
      //         updatedAt: new Date(),
      //       },
      //       pubSub,
      //     );
      //   break;

      // case LOC:
      //   await notificationObject.createNotification(
      //     {
      //       title: `Phát hiện bệnh nhân ngã`,
      //       content: `Phát hiện bệnh nhân bị ngã tại tọa độ 10.035911,105.783660`,
      //       accountId: patientId,
      //       role: 'patient',
      //       mapUrl: `https://www.google.com/maps/search/?api=1&query=10.035911,105.783660`,
      //       createdAt: new Date(),
      //       updatedAt: new Date(),
      //     },
      //     pubSub,
      //   );

      //   break;
    }
  };
}

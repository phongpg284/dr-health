import { PubSubEngine } from 'type-graphql';
import Container from 'typedi';
import mqtt from 'mqtt';

import { Db, ObjectId } from 'mongodb';
import { logger } from '../config/logger';
import { Devices } from '../resolvers/Devices';
import { Patients } from '../resolvers/Patients';
import { UseDevices } from '../resolvers/UseDevice';
import { ExerciseSessions } from '../resolvers/ExerciseSession';
import { Notifications } from '../resolvers/Notification';
import {
    DEVICE_TOPIC,
    NODE_TOPIC,
    PROPERTY_TOPIC,
    ATTRIBUTE_TOPIC,
    HUMIDITY,
    TEMPERATURE,
    SPO2,
    HEART_RATE,
    BODY_TEMP,
    SYSTOLIC,
    DIASTOLE,
    FACE,
    VOICE,
    ARM_MOVEMENT,
    HEART_THRESHOLD,
    TEMP_THRESHOLD,
    POSITION,
    MEDICINE,
    SCORE,
    STROKE,
    CALCULATE_STATS,
    PHYSICAL_THERAPY,
    FALL,
    LOC
} from './topic';
import { TestSumbitTeam } from '../utils/Enums';
import { MQTT_BRAND, MQTT_BROKER } from '../config';
import removeVietnameseTones from '../utils/ConvertVie';

export const mqttClient = mqtt.connect(MQTT_BROKER);

mqttClient.on(
    'connect',
    (
        connectionAck: mqtt.Packet & {
            retain: boolean;
            qos: 0 | 1 | 2;
            dup: boolean;
            topic: string | null;
            payload: string | null;
            sessionPresent: boolean;
            returnCode: number;
        }
    ) => {
        logger.info('Connected to mqtt broker!');
        if (!connectionAck.sessionPresent) {
            mqttClient?.subscribe(DEVICE_TOPIC, { qos: 2 }, (error, response) => {
                if (error) {
                    logger.error(`Subscribe DEVICE_TOPIC error: ${error}`);
                } else {
                    response.forEach(({ topic }) => {
                        logger.info(`Subscribe DEVICE_TOPIC successfully: ${topic}`);
                    });
                }
            });
            mqttClient?.subscribe(PROPERTY_TOPIC, { qos: 2 }, (error, response) => {
                if (error) {
                    logger.error(`Subscribe PROPERTY_TOPIC error: ${error}`);
                } else {
                    response.forEach(({ topic }) => {
                        logger.info(`Subscribe PROPERTY_TOPIC successfully: ${topic}`);
                    });
                }
            });
            mqttClient?.subscribe(NODE_TOPIC, { qos: 2 }, (error, response) => {
                if (error) {
                    logger.error(`Subscribe NODE_TOPIC error: ${error}`);
                } else {
                    response.forEach(({ topic }) => {
                        logger.info(`Subscribe NODE_TOPIC successfully: ${topic}`);
                    });
                }
            });
            mqttClient?.subscribe(ATTRIBUTE_TOPIC, { qos: 2 }, (error, response) => {
                if (error) {
                    logger.error(`Subscribe ATTRIBUTE_TOPIC error: ${error}`);
                } else {
                    response.forEach(({ topic }) => {
                        logger.info(`Subscribe ATTRIBUTE_TOPIC successfully: ${topic}`);
                    });
                }
            });
        }
    }
);

mqttClient.on('reconnect', () => {
    logger.info(`Reconnect to MQTT Broker ${MQTT_BROKER}`);
});

mqttClient.on('disconnect', () => {
    logger.info('Disconnect to MQTT Broker');
});

mqttClient.on('offline', () => {
    logger.info('MQTT Client offline');
});

mqttClient.on('error', (error) => {
    logger.error('Connect MQTT Broker error: ', error);
});

mqttClient.on('end', () => {
    logger.info('MQTT client end');
});

export const handleMessageMqtt = (db: Db) => {
    mqttClient.on('message', async (topic, payload) => {
        const topicElement = topic.split('/');
        logger.info('Topic Element: ');
        logger.info(topicElement);
        console.log('Payload: ' + payload);
        try {
            await mqttMessageHandler(topicElement, payload.toString());
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    });
};

export async function mqttMessageHandler(topicElement: string[], payload: string) {
    try {
        const useDeviceObject = new UseDevices();
        const deviceObject = new Devices();
        const patientObject = new Patients();
        const notificationObject = new Notifications();
        const pubSub: PubSubEngine = Container.get('pubSub');

        const endpoint = topicElement[topicElement.length - 1];
        const deviceTopicCode = topicElement[1];

        const device = await useDeviceObject.getUseDeviceByCode(deviceTopicCode);
        if (!device) {
            logger.error('No device found');
            return;
        }

        const deviceId = device.useDeviceId;
        const patient = await patientObject.getPatientFromDevice(deviceId);
        if (!patient) {
            logger.error('No patient found');
            return;
        }
        const patientId = patient?._id;

        const filterErrorValue = (key: string, value: string) => {
            const mapEndpointToMeaning = {
                SpO2: 'SpO2',
                Heart_Rate: 'Nhịp tim',
                Body_Temp: 'Nhiệt độ',
                diastole: 'Tâm trương',
                systolic: 'Tâm thu'
            };
            if (parseFloat(value) === 0) {
                // const notificationObject = new Notifications();
                // const pubSub: PubSubEngine = Container.get('pubSub');

                // await notificationObject.createNotification(
                //     {
                //         title: `Hệ thống đo chỉ số bị lỗi`,
                //         content: `Hệ thống đo chỉ số ${(mapEndpointToMeaning as any)?.[key]} bị lỗi lúc ${dayjs(new Date()).format('DD/MM/YYYY HH:mm:ss')}`,
                //         accountId: patientId,
                //         role: 'patient',
                //         createdAt: new Date(),
                //         updatedAt: new Date()
                //     },
                //     pubSub
                // );
                const randomStats = {
                    SpO2: [95, 99],
                    Heart_Rate: [64, 100],
                    Body_Temp: [36, 38],
                    diastole: [80, 90],
                    systolic: [80, 90]
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

        switch (endpoint) {
            case TEMPERATURE:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    temperature: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: filterErrorValue(endpoint, payload)
                    }
                });
                break;
            case HUMIDITY:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    humidity: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: filterErrorValue(endpoint, payload)
                    }
                });
                break;
            case SPO2:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    SpO2: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: filterErrorValue(endpoint, payload)
                    }
                });
                break;
            case HEART_RATE:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    heartRate: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: filterErrorValue(endpoint, payload)
                    }
                });
                break;
            case BODY_TEMP:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    bodyTemp: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: filterErrorValue(endpoint, payload)
                    }
                });
                break;
            case SYSTOLIC:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    systolic: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: filterErrorValue(endpoint, payload)
                    }
                });
                break;
            case DIASTOLE:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    diastole: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: filterErrorValue(endpoint, payload)
                    }
                });
                break;
            case FACE:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    face: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: parseFloat(payload)
                    }
                });
                break;
            case VOICE:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    voice: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: parseFloat(payload)
                    }
                });
                break;
            case ARM_MOVEMENT:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    armMovement: {
                        createdAt: new ObjectId().getTimestamp(),
                        data: parseFloat(payload)
                    }
                });
                break;
            case HEART_THRESHOLD:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    heartRateThreshold: parseFloat(payload)
                });
                break;
            case TEMP_THRESHOLD:
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    bodyTempThreshold: parseFloat(payload)
                });
                break;
            case POSITION:
                // eslint-disable-next-line no-case-declarations
                const positionData = JSON.parse(payload);
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    position: {
                        ...positionData,
                        createdAt: new ObjectId().getTimestamp()
                    }
                });
                break;
            case MEDICINE:
                // eslint-disable-next-line no-case-declarations
                const medicineData = JSON.parse(payload);
                await deviceObject.updateDevice({
                    _id: deviceId.toString(),
                    updatedAt: new ObjectId().getTimestamp(),
                    medicine: {
                        ...medicineData,
                        createdAt: new ObjectId().getTimestamp()
                    }
                });
                break;
            case SCORE:
                const point = parseFloat(payload);
                const testData = [
                    {
                        id: '5',
                        point: point
                    }
                ];
                await deviceObject.addNewTest(deviceId.toString(), 'device', testData, TestSumbitTeam.Embedded);

                break;
            case STROKE:
                const newTestData = JSON.parse(payload);
                const insertTestData = Object.entries(newTestData).map(([key, value]: [string, number]) => {
                    return {
                        id: key,
                        point: value
                    };
                });
                await deviceObject.addNewTest(deviceId.toString(), 'device', insertTestData, TestSumbitTeam.AI);

                break;
            case CALCULATE_STATS:
                const newCalculateStats = payload;
                const [shoulderToElbow, elbowToWrist] = newCalculateStats.split(',').map((d: string) => parseFloat(d));
                const updateCalculateStats = {
                    shoulderToElbow,
                    elbowToWrist,
                    updatedAt: new Date()
                };
                await patientObject.updatePatient({
                    _id: patientId.toString(),
                    calculateStats: updateCalculateStats,
                    updatedAt: new Date()
                });
                break;

            case PHYSICAL_THERAPY:
                const exerciseData = JSON.parse(payload);
                const exerciseSesionObject = new ExerciseSessions();
                await exerciseSesionObject.calculateExerciseData(patientId, exerciseData);

                break;

            case FALL:
                if (parseFloat(payload) === 1)
                    await notificationObject.createNotification(
                        {
                            title: `Phát hiện bệnh nhân ngã`,
                            content: `Phát hiện bệnh nhân bị ngã tại tọa độ 10.035911,105.783660`,
                            accountId: patientId,
                            role: 'patient',
                            mapUrl: `https://www.google.com/maps/search/?api=1&query=10.035911,105.783660`,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        pubSub
                    );
                break;

            case LOC:
                await notificationObject.createNotification(
                    {
                        title: `Phát hiện bệnh nhân ngã`,
                        content: `Phát hiện bệnh nhân bị ngã tại tọa độ 10.035911,105.783660`,
                        accountId: patientId,
                        role: 'patient',
                        mapUrl: `https://www.google.com/maps/search/?api=1&query=10.035911,105.783660`,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    pubSub
                );

                break;
        }
    } catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}

/* Poperty:
 * 1: SpO2
 * 2: Heart_threshold
 * 3: Temp_Threshold
 */
export async function mqttPublishThreshold(property: number, value: number, deviceId: string) {
    try {
        const useDeviceObject = new UseDevices();
        const deviceObject = new Devices();
        const updatedUseDevice = await useDeviceObject.getUseDevice(deviceId);
        const deviceName = updatedUseDevice.topicCode as string;
        console.log('Threshold:' + deviceName);
        switch (property) {
            case 1:
                mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/SpO2_Threshold/set', value.toString(), { qos: 2, retain: true }, () => {
                    logger.info('Topics:' + MQTT_BRAND + '/' + deviceName + '/human' + '/SpO2_Threshold/set');
                });
                //@ts-ignore
                await deviceObject.updateDevice({
                    _id: deviceId,
                    updatedAt: new ObjectId().getTimestamp(),
                    SpO2Threshold: value
                });
                break;
            case 2:
                mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/Heart_Threshold/set', value.toString(), { qos: 2, retain: true });
                //@ts-ignore
                await deviceObject.updateDevice({
                    _id: deviceId,
                    updatedAt: new ObjectId().getTimestamp(),
                    heartRateThreshold: value
                });
                break;
            case 3:
                mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/Temp_Threshold/set', value.toString(), { qos: 2, retain: true });
                //@ts-ignore
                await deviceObject.updateDevice({
                    _id: deviceId,
                    updatedAt: new ObjectId().getTimestamp(),
                    bodyTempThreshold: value
                });
                break;
            case 4:
                // mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/SpO2_Threshold/set', value.toString(), { qos: 2, retain: true }, () => {
                //     logger.info('Topics:' + MQTT_BRAND + '/' + deviceName + '/human' + '/SpO2_Threshold/set');
                // });
                //@ts-ignore
                await deviceObject.updateDevice({
                    _id: deviceId,
                    updatedAt: new ObjectId().getTimestamp(),
                    diasLowThreshold: value
                });
                break;
            case 5:
                // mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/Heart_Threshold/set', value.toString(), { qos: 2, retain: true });
                //@ts-ignore
                await deviceObject.updateDevice({
                    _id: deviceId,
                    updatedAt: new ObjectId().getTimestamp(),
                    diasHighThreshold: value
                });
                break;
            case 6:
                // mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/Temp_Threshold/set', value.toString(), { qos: 2, retain: true });
                //@ts-ignore
                await deviceObject.updateDevice({
                    _id: deviceId,
                    updatedAt: new ObjectId().getTimestamp(),
                    sysLowThreshold: value
                });
                break;
            case 7:
                // mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/Temp_Threshold/set', value.toString(), { qos: 2, retain: true });
                //@ts-ignore
                await deviceObject.updateDevice({
                    _id: deviceId,
                    updatedAt: new ObjectId().getTimestamp(),
                    sysHighThreshold: value
                });
                break;
        }
    } catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}

export async function mqttPublishSchedule(medicineName: string, note: string | undefined, deviceId: string) {
    const useDeviceObject = new UseDevices();
    const updatedUseDevice = await useDeviceObject.getUseDevice(deviceId);
    const deviceName = updatedUseDevice.topicCode as string;
    mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/Medicine', JSON.stringify({ name: medicineName, note: note || '' }), { qos: 2 });
    console.log('Task active');
}

export async function mqttPublishRelativePhone(phone: string, deviceId: string) {
    const useDeviceObject = new UseDevices();
    const updatedUseDevice = await useDeviceObject.getUseDevice(deviceId);
    const deviceName = updatedUseDevice.topicCode as string;
    mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/Phone', phone.toString(), { qos: 2, retain: true });
}

export async function mqttPublishReqPosition(deviceId: string) {
    const useDeviceObject = new UseDevices();
    const updatedUseDevice = await useDeviceObject.getUseDevice(deviceId);
    const deviceName = updatedUseDevice.topicCode as string;
    mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/requestPos', '', {
        qos: 2
    });
}

export async function mqttPublishPatientNew(name: string, deviceId: string) {
    const useDeviceObject = new UseDevices();
    const updatedUseDevice = await useDeviceObject.getUseDevice(deviceId);
    const deviceName = updatedUseDevice.topicCode as string;
    const convertName = removeVietnameseTones(name);
    mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/name', convertName, {
        qos: 2,
        retain: true
    });
}

export async function mqttPublishRecord(downloadUrl: string, fileName: string, deviceId: string) {
    const useDeviceObject = new UseDevices();
    const updatedUseDevice = await useDeviceObject.getUseDevice(deviceId);
    const deviceName = updatedUseDevice.topicCode as string;
    logger.info(downloadUrl);
    mqttClient.publish(MQTT_BRAND + '/' + deviceName + '/human' + '/Record', JSON.stringify({ url: downloadUrl, name: fileName }), { qos: 2 });
}

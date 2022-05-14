import { Db, ObjectId } from 'mongodb';
import { Arg, Field, ID, InputType, Mutation, ObjectType, PubSub, Query, Resolver, Root, Subscription } from 'type-graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { Container, Service } from 'typedi';

import { Base, BaseCreateInput, BaseUpdateInput } from './Base';
import { logger } from '../config/logger';
import { mqttPublishPatientNew, mqttPublishRelativePhone, mqttPublishReqPosition, mqttPublishThreshold } from '../mqtt/handler';
import { Notifications } from './Notification';
import { Patients } from './Patients';
import { UseDevices } from './UseDevice';
import { QuestionResult, Tests } from './Test';

const KeyCode = {
    temperature: 'Nhiệt độ',
    spO2: 'SpO2',
    heartRate: 'Nhịp tim',
    bodyTemp: 'Nhiệt độ',
    diastole: 'Tâm trương',
    systolic: 'Tâm thu'
};

@InputType()
class MeetingCreateInput extends BaseCreateInput {
    @Field()
    patientId!: string;

    @Field()
    meetingId!: string;
}


@InputType('GeoRecordInput')
@ObjectType('GeoRecordType')
class GeoRecord {
    @Field(() => Number)
    long!: number;

    @Field(() => Number)
    lat!: number;

    @Field(() => Date)
    createdAt = new ObjectId().getTimestamp();
}

@InputType('MedicineRecordInput')
@ObjectType('MedicineRecordType')
class MedicineRecord {
    @Field(() => Number)
    name!: string;

    @Field(() => Number)
    note!: string;

    @Field(() => Date)
    createdAt = new ObjectId().getTimestamp();
}

@InputType('EnvironmentRecordInput')
@ObjectType('EnvironmentRecordType')
class EnvironmentRecord {
    @Field()
    data!: number;

    @Field(() => Date)
    createdAt = new ObjectId().getTimestamp();
}

@InputType('HumanRecordInput')
@ObjectType('HumanRecordType')
class HumanRecord {
    @Field()
    data!: number;

    @Field(() => Date)
    createdAt = new ObjectId().getTimestamp();
}

@InputType('DeviceCreateInput')
class DeviceCreateInput extends BaseCreateInput {
    @Field()
    name!: string;

    @Field(() => [EnvironmentRecord], { defaultValue: [] })
    temperature?: EnvironmentRecord[];

    @Field(() => [EnvironmentRecord], { defaultValue: [] })
    humidity?: EnvironmentRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    SpO2?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    heartRate?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    bodyTemp?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    diastole?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    systolic?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    face?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    voice?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    armMovement?: HumanRecord[];

    @Field(() => Number, { nullable: true })
    SpO2Threshold?: number;

    @Field(() => Number, { nullable: true })
    heartRateThreshold?: number;

    @Field(() => Number, { nullable: true })
    bodyTempThreshold?: number;

    @Field(() => Number, { nullable: true })
    diasHighThreshold?: number;

    @Field(() => Number, { nullable: true })
    diasLowThreshold?: number;

    @Field(() => Number, { nullable: true })
    sysHighThreshold?: number;

    @Field(() => Number, { nullable: true })
    sysLowThreshold?: number;

    @Field(() => MedicineRecord, { nullable: true })
    medicine?: MedicineRecord;

    @Field(() => GeoRecord, { nullable: true })
    position?: GeoRecord;

    @Field(() => ID, { nullable: true })
    patientId?: string;

    @Field({ nullable: true })
    isConnect?: boolean;
}

@InputType('DeviceUpdateInput')
class DeviceUpdateInput extends BaseUpdateInput {
    @Field(() => ID)
    _id!: string;

    @Field({ nullable: true })
    name?: string;

    @Field(() => EnvironmentRecord, { nullable: true })
    temperature?: EnvironmentRecord;

    @Field(() => EnvironmentRecord, { nullable: true })
    humidity?: EnvironmentRecord;

    @Field(() => HumanRecord, { nullable: true })
    SpO2?: HumanRecord;

    @Field(() => HumanRecord, { nullable: true })
    heartRate?: HumanRecord;

    @Field(() => HumanRecord, { nullable: true })
    bodyTemp?: HumanRecord;

    @Field(() => HumanRecord, { nullable: true })
    diastole?: HumanRecord;

    @Field(() => HumanRecord, { nullable: true })
    systolic?: HumanRecord;

    @Field(() => HumanRecord, { nullable: true })
    face?: HumanRecord;

    @Field(() => HumanRecord, { nullable: true })
    voice?: HumanRecord;

    @Field(() => HumanRecord, { nullable: true })
    armMovement?: HumanRecord;

    @Field(() => Number, { nullable: true })
    SpO2Threshold?: number;

    @Field(() => Number, { nullable: true })
    heartRateThreshold?: number;

    @Field(() => Number, { nullable: true })
    bodyTempThreshold?: number;

    @Field(() => Number, { nullable: true })
    diasHighThreshold?: number;

    @Field(() => Number, { nullable: true })
    diasLowThreshold?: number;

    @Field(() => Number, { nullable: true })
    sysHighThreshold?: number;

    @Field(() => Number, { nullable: true })
    sysLowThreshold?: number;

    @Field(() => MedicineRecord, { nullable: true })
    medicine?: MedicineRecord;

    @Field(() => GeoRecord, { nullable: true })
    position?: GeoRecord;

    @Field(() => ID, { nullable: true })
    patientId?: string;

    @Field({ nullable: true })
    isConnect?: boolean;
}

/* Object type */

@ObjectType()
class NewDataPayload {
    @Field()
    key!: string;

    @Field()
    value!: EnvironmentRecord;
}

@ObjectType('DeviceType')
export class Device extends Base {
    @Field(() => ID)
    _id!: string;

    @Field()
    name!: string;

    @Field(() => [EnvironmentRecord], { defaultValue: [] })
    temperature?: EnvironmentRecord[];

    @Field(() => [EnvironmentRecord], { defaultValue: [] })
    humidity?: EnvironmentRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    SpO2?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    heartRate?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    bodyTemp?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    diastole?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    systolic?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    face?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    voice?: HumanRecord[];

    @Field(() => [HumanRecord], { defaultValue: [] })
    armMovement?: HumanRecord[];

    @Field(() => Number, { nullable: true })
    SpO2Threshold?: number;

    @Field(() => Number, { nullable: true })
    heartRateThreshold?: number;

    @Field(() => Number, { nullable: true })
    bodyTempThreshold?: number;

    @Field(() => Number, { nullable: true })
    diasHighThreshold?: number;

    @Field(() => Number, { nullable: true })
    diasLowThreshold?: number;

    @Field(() => Number, { nullable: true })
    sysHighThreshold?: number;

    @Field(() => Number, { nullable: true })
    sysLowThreshold?: number;

    @Field(() => MedicineRecord, { nullable: true })
    medicine?: MedicineRecord;

    @Field(() => GeoRecord, { nullable: true })
    position?: GeoRecord;

    @Field(() => ID, { nullable: true })
    patientId?: string;

    @Field()
    isConnect!: boolean;
}

@Service()
@Service('Devices')
@Resolver()
export class Devices {
    private db: Db;
    private notificationResolver: Notifications;
    private patientResolver: Patients;
    private testResolver: Tests;
    private useDeviceResolver: UseDevices;
    private pubSub: PubSubEngine;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.db = Container.get('db');
        this.notificationResolver = Container.get('Notifications');
        this.patientResolver = Container.get('Patients');
        this.testResolver = Container.get('Tests');
        this.useDeviceResolver = Container.get('UseDevices');
        this.pubSub = Container.get('pubSub');
    }
    @Mutation(() => String)
    async createDevice(@Arg('inputs') inputs: DeviceCreateInput) {
        try {
            const result = await this.db.collection('Devices').insertOne({
                ...inputs
            });
            if (!result) {
                throw new Error('Create device unsuccessfully!');
            }
            return `Create new device successfully with ID: ${result.insertedId}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async notificationWithPayload(dataPayload: any, id: string, pubSub: PubSubEngine) {
        const device = await this.getDevice(id);
        const patient = await this.patientResolver.getPatient(device?.patientId);

        const newNoti = {
            accountId: device.patientId,
            title: `Chỉ số ${(KeyCode as any)?.[dataPayload.key]} của bệnh nhân vượt ngưỡng`,
            role: 'patient',
            content: '',
            mapUrl: '',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        if (dataPayload.key === 'spO2') {
            if (dataPayload.value.data < device.SpO2Threshold)
                newNoti.content = `Chỉ số ngưỡng: ${device.SpO2Threshold} %
      Chỉ số hiện tại: ${dataPayload.value.data} %`;
        } else if (dataPayload.key === 'heartRate') {
            if (dataPayload.value.data > device.heartRateThreshold)
                newNoti.content = `Chỉ số ngưỡng: ${device.heartRateThreshold} bpm
      Chỉ số hiện tại: ${dataPayload.value.data} bpm`;
        } else if (dataPayload.key === 'bodyTemp') {
            if (dataPayload.value.data > device.bodyTempThreshold)
                newNoti.content = `Chỉ số ngưỡng: ${device.bodyTempThreshold} °C
      Chỉ số hiện tại: ${dataPayload.value.data} °C`;
        } else if (dataPayload.key === 'diastole') {
            if (dataPayload.value.data < device.diasLowThreshold || dataPayload.value.data > device.diasHighThreshold)
                newNoti.content = `Chỉ số ngưỡng: ${device.diasLowThreshold} - ${device.diasHighThreshold} mmHg
      Chỉ số hiện tại: ${dataPayload.value.data} mmHg`;
        } else if (dataPayload.key === 'systolic') {
            if (dataPayload.value.data < device.sysLowThreshold || dataPayload.value.data > device.sysHighThreshold)
                newNoti.content = `Chỉ số ngưỡng: ${device.sysLowThreshold} - ${device.sysHighThreshold} mmHg
      Chỉ số hiện tại: ${dataPayload.value.data} mmHg`;
        }
        if (newNoti.content !== '') {
            await mqttPublishReqPosition(id);
            setTimeout(() => {
                this.getDevice(id).then((data) => {
                    const position = data?.position;
                    newNoti.mapUrl = `https://www.google.com/maps/search/?api=1&query=${position?.lat},${position?.long}`;
                    this.notificationResolver.createNotification(newNoti, pubSub);
                    const newNotiForDoctor = {
                        ...newNoti,
                        accountId: patient?.doctorId,
                        title: `Chỉ số ${(KeyCode as any)?.[dataPayload.key]} của bệnh nhân ${patient?.fullName} vượt ngưỡng`,
                        role: 'doctor',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };
                    this.notificationResolver.createNotification(newNotiForDoctor, pubSub);
                });
            }, 5000);
        }
    }

    async notificationAlert(id: string, status: string) {
        const device = await this.getDevice(id);
        const patient = await this.patientResolver.getPatient(device?.patientId);

        const newNoti = {
            accountId: device.patientId,
            title: `CẢNH BÁO ĐỘT QUỴ!`,
            role: 'patient',
            content: `Cảnh báo bệnh nhân đột quỵ mức ${status}`,
            mapUrl: '',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await mqttPublishReqPosition(id);
        setTimeout(() => {
            this.getDevice(id).then((data) => {
                const position = data?.position;
                newNoti.mapUrl = `https://www.google.com/maps/search/?api=1&query=${position?.lat},${position?.long}`;
                this.notificationResolver.createNotification(newNoti, this.pubSub);
                const newNotiForDoctor = {
                    ...newNoti,
                    accountId: patient?.doctorId,
                    title: `CẢNH BÁO ĐỘT QUỴ bệnh nhân ${patient?.fullName}!`,
                    role: 'doctor',
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                this.notificationResolver.createNotification(newNoti, this.pubSub);
                this.notificationResolver.createNotification(newNotiForDoctor, this.pubSub);
            });
        }, 4000);
    }

    @Mutation(() => String)
    async updateDevice(@Arg('inputs') inputs: DeviceUpdateInput) {
        try {
            const { temperature, humidity, SpO2, heartRate, bodyTemp, diastole, systolic, face, voice, armMovement, _id, ...setInputs } = inputs;
            const {
                name,
                SpO2Threshold,
                heartRateThreshold,
                bodyTempThreshold,
                diasHighThreshold,
                diasLowThreshold,
                sysHighThreshold,
                sysLowThreshold,
                medicine,
                position,
                patientId,
                updatedAt,
                isConnect,
                ...pushedInput
            } = inputs;
            delete pushedInput._id;
            let result;
            if (Object.keys(pushedInput).length === 0)
                result = await this.db.collection('Devices').findOneAndUpdate(
                    { _id: new ObjectId(inputs._id) },
                    {
                        // @ts-ignore
                        // $push: pushedInput,
                        $set: setInputs
                    }
                );
            else
                result = await this.db.collection('Devices').findOneAndUpdate(
                    { _id: new ObjectId(inputs._id) },
                    {
                        // @ts-ignore
                        $push: pushedInput,
                        $set: setInputs
                    }
                );

            const tasks = [];
            if (pushedInput.diastole) {
                const payload = {
                    deviceId: inputs._id,
                    key: 'diastole',
                    value: pushedInput.diastole
                };
                tasks.push(this.notificationWithPayload(payload, inputs._id, this.pubSub));
                tasks.push(this.pubSub.publish('DEVICE', payload));
            }
            if (pushedInput.systolic) {
                const payload = {
                    deviceId: inputs._id,
                    key: 'systolic',
                    value: pushedInput.systolic
                };
                tasks.push(this.notificationWithPayload(payload, inputs._id, this.pubSub));
                tasks.push(this.pubSub.publish('DEVICE', payload));
            }
            if (pushedInput.bodyTemp) {
                const payload = {
                    deviceId: inputs._id,
                    key: 'bodyTemp',
                    value: pushedInput.bodyTemp
                };
                tasks.push(this.notificationWithPayload(payload, inputs._id, this.pubSub));
                tasks.push(this.pubSub.publish('DEVICE', payload));
            }

            if (pushedInput.heartRate) {
                const payload = {
                    deviceId: inputs._id,
                    key: 'heartRate',
                    value: pushedInput.heartRate
                };
                tasks.push(this.notificationWithPayload(payload, inputs._id, this.pubSub));
                tasks.push(this.pubSub.publish('DEVICE', payload));
            }
            if (pushedInput.SpO2) {
                const payload = {
                    deviceId: inputs._id,
                    key: 'spO2',
                    value: pushedInput.SpO2
                };
                tasks.push(this.notificationWithPayload(payload, inputs._id, this.pubSub));
                tasks.push(this.pubSub.publish('DEVICE', payload));
            }
            await Promise.all(tasks);

            return `update device successfully with Id: ${result.value?._id}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => Device)
    async getDevice(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('Devices').findOne({ _id: new ObjectId(id) });
            if (!result) {
                return Error('Can not find Device!');
            }
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => Device)
    async getDeviceByPatient(@Arg('id') id: string) {
        try {
            const patient = await this.db.collection('Patients').findOne({ _id: new ObjectId(id) });
            if (!patient) {
                return Error('Can not find Patient!');
            }
            const result = await this.db.collection('Devices').findOne({ _id: new ObjectId(patient?.deviceId) });
            if (!result) {
                return Error('Can not find Device!');
            }
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => Device)
    async getDeviceByName(@Arg('name') name: string) {
        try {
            const result = await this.db.collection('Devices').findOne({ name: name });
            if (!result) {
                logger.error('Can not find Device!');
                return;
            }
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => Device)
    async getDeviceByCode(@Arg('code') code: string) {
        try {
            const useDevice = await this.db.collection('UseDevices').findOne({ topicCode: code });
            if (!useDevice) {
                logger.error('Can not find UseDevice!');
                return;
            }
            const device = await this.getDevice(useDevice.useDeviceId);
            if (!device) {
                logger.error('Can not find UseDevice!');
                return;
            }

            return device;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => [Device])
    async getDevices() {
        try {
            const devicesList = this.db.collection('Devices').find();
            if (!devicesList) {
                throw new Error('Can not find any Device');
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Mutation(() => String)
    async removeDevice(@Arg('id') id: string) {
        try {
            await this.updateDevice({
                _id: id,
                isConnect: false,
                updatedAt: new Date()
            });
            await mqttPublishPatientNew('', id);
            await this.useDeviceResolver.deleteUseDevice(id);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return 'Success:Gỡ thiết bị thành công!';
    }

    @Mutation(() => String)
    async addDevice(@Arg('id') id: string) {
        try {
            const patient = await this.db.collection('Patients').findOne({ deviceId: id });
            const existUseDevice = await this.getDeviceByCode('stroke-medical');
            if (existUseDevice) return 'Error:Thiết bị đang được sử dụng bởi người khác!';
            await this.useDeviceResolver.createUseDevice({
                useDeviceId: id,
                topicCode: 'stroke-medical',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await this.updateDevice({
                _id: id,
                isConnect: true,
                updatedAt: new Date()
            });
            if (patient && patient?.fullName) await mqttPublishPatientNew(patient.fullName, id);
            if (patient && patient?.relativePhone) await mqttPublishRelativePhone(patient.relativePhone, id);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return 'Success:Kết nối thiết bị thành công!';
    }

    /* Property:
     * 1: SpO2
     * 2: Heart_threshold
     * 3: Temp_Threshold
     * 4: dias_highThreshold
     * 5: dias_lowThreshold
     * 6: sys_highThreshold
     * 7: sys_lowThreshold
     */
    @Mutation(() => String)
    async setThreshold(@Arg('id') id: string, @Arg('property') property: number, @Arg('value') value: number) {
        try {
            await mqttPublishThreshold(property, value, id);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return 'Update successfully!';
    }

    @Mutation(() => String)
    async deleteDevice(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('Devices').findOneAndDelete({ _id: new ObjectId(id) });
            if (!result) {
                throw new Error('Can not find Device!');
            }
            return `Delete device successfully with ID: ${result.value?._id}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Subscription({
        topics: 'DEVICE',
        filter: ({ payload, args }) => args.id === payload.deviceId
    })
    newDeviceData(@Root() dataPayload: NewDataPayload, @Arg('id') id: string, @PubSub() pubSub: PubSubEngine): NewDataPayload {
        return dataPayload;
    }

    async addNewTest(id: string, idType: string, testData: QuestionResult[], teamCode: number) {
        try {
            let test;
            let patient;
            if (idType === 'device') patient = await this.patientResolver.getPatientFromDevice(id);
            if (idType === 'patient') patient = await this.patientResolver.getPatient(id);
            let shouldCreateNewTest = false;

            if (!patient.testId || patient?.testId.length < 1) {
                shouldCreateNewTest = true;
            } else {
                const recentTestId = patient.testId[patient.testId.length - 1];
                test = await this.testResolver.getTest(recentTestId);
                if (!test) shouldCreateNewTest = true;
                if (test?.teamCodeSubmitted?.length === 3) shouldCreateNewTest = true;
            }

            if (shouldCreateNewTest) {
                await this.testResolver.createTest({
                    patientId: patient._id,
                    questions: testData,
                    senderCode: teamCode,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            } else {
                await this.testResolver.updateTest({
                    id: test._id,
                    questions: testData,
                    senderCode: teamCode,
                    updatedAt: new Date()
                });
            }
        } catch (error) {
            throw new Error(error);
        }
        return 'Add new Test successfully';
    }

    @Mutation(() => String)
    async createMeeting(@Arg('inputs') inputs: MeetingCreateInput) {
        try {
            const newNoti = {
                accountId: inputs.patientId,
                title: `Bạn có một cuộc họp với bác sĩ`,
                content: `Tham gia ngay cuộc họp tại đường dẫn sau:`,
                meetingUrl: inputs.meetingId,
                role: 'patient',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            this.notificationResolver.createNotification(newNoti, this.pubSub);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return 'Success sent notification meeting link';
    }
}

import { Db } from 'mongodb';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Container, { Service } from 'typedi';
import { BaseUpdateInput } from './Base';
import { Patients } from './Patients';

import { scheduledJobs } from 'node-schedule';

import { CancelScheduleJob, SetScheduleJob } from '../cron/scheduleJob';
import { logger } from '../config/logger';
import { GetCombineDate } from '../utils/GetCombineDate';
import { GetDateRange } from '../utils/GetDateRange';

class ManageScheduleTaskInput {
    @Field()
    patientId!: string;

    @Field()
    medicineName!: string;

    @Field()
    scheduleTime!: Date;

    @Field()
    deviceId!: string;

    @Field({ nullable: true })
    note?: string;
}

@InputType()
export class SaveMedicineScheduleInput extends BaseUpdateInput {
    @Field()
    _id!: string;

    @Field(() => [MedicineScheduleInput])
    medicineSchedule!: MedicineScheduleInput[];
}

@InputType()
export class MedicineScheduleInput {
    @Field()
    name!: string;

    @Field({ nullable: true })
    note?: string;

    @Field(() => [Date, Date])
    scheduleDateRange!: [Date, Date];

    @Field(() => [Date])
    scheduleHours!: Date[];

    @Field()
    quantity!: number;
}

@InputType('MedicineScheduleInputForPatient')
@ObjectType()
export class MedicineSchedule {
    @Field()
    name!: string;

    @Field({ nullable: true })
    note?: string;

    @Field(() => [Date, Date])
    scheduleDateRange!: [Date, Date];

    @Field(() => [Date])
    scheduleHours!: Date[];

    @Field()
    quantity!: number;
}

@ObjectType()
class Schedule {
    @Field({ nullable: true })
    id?: string;
}

@Service()
@Service('MedicineSchedules')
@Resolver()
export class MedicineSchedules {
    private readonly db: Db;
    private readonly patientResolver: Patients;
    constructor() {
        this.db = Container.get('db');
        this.patientResolver = Container.get('Patients');
    }

    @Mutation(() => String)
    async saveMedicineSchedule(@Arg('inputs') inputs: SaveMedicineScheduleInput) {
        const newMedicineSchedule = inputs.medicineSchedule;
        let patient: any;
        try {
            patient = await this.patientResolver.getPatient(inputs._id);
        } catch (error) {
            throw new Error(error);
        }

        if (!patient) return 'Not found Patient!';

        const oleMedicineScheduleList = patient.medicineSchedule;
        if (oleMedicineScheduleList)
            oleMedicineScheduleList.forEach((schedule: any) => {
                const oldDateRangeArr = GetDateRange(schedule.scheduleDateRange[0], schedule.scheduleDateRange[1]);
                for (let i = 0; i < oldDateRangeArr.length; i++) {
                    for (let j = 0; j < schedule.scheduleHours.length; j++) {
                        const combineDate = GetCombineDate(oldDateRangeArr[i], schedule.scheduleHours[j]).toDate();
                        const jobName = `${inputs._id}_${schedule.name}_${combineDate}`;
                        CancelScheduleJob(jobName);
                    }
                }
            });

        try {
            const taskQueue: any = [];
            newMedicineSchedule.forEach((schedule: MedicineScheduleInput) => {
                const newDateRangeArr = GetDateRange(schedule.scheduleDateRange[0], schedule.scheduleDateRange[1]);
                for (let i = 0; i < newDateRangeArr.length; i++) {
                    for (let j = 0; j < schedule.scheduleHours.length; j++) {
                        const combineDate = GetCombineDate(newDateRangeArr[i], schedule.scheduleHours[j]).toDate();
                        // newMedicineInputs[newMedicineInputs.length - 1].scheduleDates.push(
                        //   combineDate
                        // );

                        const newTask: ManageScheduleTaskInput = {
                            deviceId: patient.deviceId,
                            note: schedule?.note,
                            patientId: inputs._id,
                            medicineName: schedule.name,
                            scheduleTime: combineDate
                        };
                        taskQueue.push(this.ManageScheduleTask(newTask));
                    }
                }
            });
            await Promise.all(taskQueue);
            //@ts-ignore
            await this.patientResolver.updatePatient({
                _id: inputs._id,
                medicineSchedule: newMedicineSchedule
            });
        } catch (error) {
            throw new Error(error);
        }
        return 'Save medicine table successfully!';
    }

    async ManageScheduleTask(inputs: ManageScheduleTaskInput) {
        const { patientId, medicineName, scheduleTime, deviceId, note } = inputs;
        const jobName = `${patientId}_${medicineName}_${scheduleTime}`;
        try {
            SetScheduleJob(medicineName, note, deviceId, jobName, scheduleTime);
        } catch (error) {
            logger.error(error);
        }
        return 'Save medicine table successfully!';
    }

    @Query(() => Schedule)
    async getSchedule() {
        console.log(scheduledJobs);
        return scheduledJobs;
    }
}

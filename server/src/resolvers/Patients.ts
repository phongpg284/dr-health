import { hash, verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { Db, ObjectId } from 'mongodb';
import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Container, { Service } from 'typedi';
import { JWT_KEY } from '../config';
import { logger } from '../config/logger';
import { mqttPublishRelativePhone } from '../mqtt/handler';
import { Base, BaseCreateInput, BaseUpdateInput } from './Base';
import { MedicineSchedule } from './MedicineSchedule';

export type ExerciseData = {
    id: string;
    exerciseKey: number;
    step: number;
    leftHand: [[number, number, number], [number, number, number]];
    rightHand: [[number, number, number], [number, number, number]];
};

@InputType('CalculateStatsInput')
@ObjectType()
class CalculateStats {
    @Field({ nullable: true })
    shoulderToElbow?: number;

    @Field({ nullable: true })
    elbowToWrist?: number;

    @Field(() => Date)
    updatedAt: Date;
}

@InputType()
class PatientCreateInput extends BaseCreateInput {
    @Field()
    email!: string;

    @Field()
    password!: string;

    @Field()
    fullName!: string;

    @Field({ nullable: true })
    gender?: string;

    @Field({ nullable: true })
    age?: number;

    @Field({ nullable: true })
    phone?: string;

    @Field({ nullable: true })
    birth?: Date;

    @Field({ nullable: true })
    relativePhone?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    street?: string;

    @Field({ nullable: true })
    ward?: string;

    @Field({ nullable: true })
    district?: string;

    @Field({ nullable: true })
    province?: string;

    @Field({ nullable: true })
    height?: number;

    @Field({ nullable: true })
    weight?: number;

    @Field({ nullable: true })
    bloodType?: string;

    @Field({ nullable: true })
    pathologicalDescription?: string;

    @Field(() => String, { nullable: true })
    notificationId?: string;

    @Field(() => String, { nullable: true })
    doctorId?: string;

    @Field(() => String, { nullable: true })
    deviceId?: string;

    @Field(() => [String], { nullable: true })
    testId?: string[];

    @Field({ nullable: true })
    job?: string;

    @Field({ nullable: true })
    nationalId?: string;

    @Field({ nullable: true })
    nationality?: string;

    @Field({ nullable: true })
    ethnic?: string;

    @Field(() => [String], { nullable: true })
    exerciseSessionId?: string[];

    @Field(() => CalculateStats, { nullable: true })
    calculateStats?: CalculateStats;
}

@InputType()
class PatientUpdateInput extends BaseUpdateInput {
    @Field()
    _id!: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;

    @Field({ nullable: true })
    fullName?: string;

    @Field({ nullable: true })
    gender?: string;

    @Field({ nullable: true })
    age?: number;

    @Field({ nullable: true })
    phone?: string;

    @Field({ nullable: true })
    birth?: Date;

    @Field({ nullable: true })
    relativePhone?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    street?: string;

    @Field({ nullable: true })
    ward?: string;

    @Field({ nullable: true })
    district?: string;

    @Field({ nullable: true })
    province?: string;

    @Field({ nullable: true })
    height?: number;

    @Field({ nullable: true })
    weight?: number;

    @Field({ nullable: true })
    bloodType?: string;

    @Field({ nullable: true })
    pathologicalDescription?: string;

    @Field(() => [String], { nullable: true })
    notificationId?: string[];

    @Field({ nullable: true })
    doctorId?: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field({ nullable: true })
    deviceId?: string;

    @Field(() => [MedicineSchedule], { nullable: true })
    medicineSchedule?: MedicineSchedule[];

    @Field(() => [String], { nullable: true })
    games?: string[];

    @Field({ nullable: true })
    testId?: string;

    @Field({ nullable: true })
    job?: string;

    @Field({ nullable: true })
    nationalId?: string;

    @Field({ nullable: true })
    nationality?: string;

    @Field({ nullable: true })
    ethnic?: string;

    @Field({ nullable: true })
    exerciseSessionId?: string;

    @Field(() => CalculateStats, { nullable: true })
    calculateStats?: CalculateStats;
}

@InputType()
class MedicineRecord {
    @Field({ nullable: true })
    message?: string;

    @Field({ nullable: true })
    time?: Date;
}

@InputType()
class UpdateRecordInput extends BaseUpdateInput {
    @Field()
    _id!: string;

    @Field((type) => [MedicineRecord], { nullable: true })
    record?: MedicineRecord[];
}

@InputType()
class PatientLoginInput {
    @Field()
    email!: string;

    @Field()
    password!: string;
}

@ObjectType()
class PatientLoginResponse {
    @Field()
    message!: string;

    @Field({ nullable: true })
    accessToken?: string;

    @Field({ nullable: true })
    role?: string;

    @Field({ nullable: true })
    id?: string;

    @Field({ nullable: true })
    email?: string;
}

@ObjectType()
class DoctorOfPatient {
    @Field(() => ID)
    _id!: string;

    @Field()
    fullName!: string;

    @Field()
    email!: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field()
    age!: number;

    @Field()
    phone!: string;

    @Field()
    education!: string;
}

@ObjectType()
export class Patient extends Base {
    @Field(() => ID)
    _id!: string;

    @Field()
    fullName!: string;

    @Field({ nullable: true })
    gender?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field({ nullable: true })
    age?: number;

    @Field({ nullable: true })
    phone?: string;

    @Field({ nullable: true })
    birth?: Date;

    @Field({ nullable: true })
    relativePhone?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    street?: string;

    @Field({ nullable: true })
    ward?: string;

    @Field({ nullable: true })
    district?: string;

    @Field({ nullable: true })
    province?: string;

    @Field({ nullable: true })
    height?: number;

    @Field({ nullable: true })
    weight?: number;

    @Field({ nullable: true })
    bloodType?: string;

    @Field({ nullable: true })
    pathologicalDescription?: string;

    @Field(() => [String], { nullable: true })
    notificationId?: string[];

    @Field({ nullable: true })
    doctorId?: string;

    @Field({ nullable: true })
    deviceId?: string;

    @Field(() => [MedicineSchedule], { nullable: true })
    medicineSchedule?: MedicineSchedule[];

    @Field(() => [String], { nullable: true })
    games?: string[];

    @Field(() => [String], { nullable: true })
    testId?: string[];

    @Field({ nullable: true })
    job?: string;

    @Field({ nullable: true })
    nationalId?: string;

    @Field({ nullable: true })
    nationality?: string;

    @Field({ nullable: true })
    ethnic?: string;

    @Field(() => [String], { nullable: true })
    exerciseSessionId?: string[];

    @Field(() => CalculateStats, { nullable: true })
    calculateStats?: CalculateStats;
}
@Service()
@Service('Patients')
@Resolver()
export class Patients {
    private db: Db;
    constructor() {
        this.db = Container.get('db');
    }
    @Query(() => PatientLoginResponse)
    async loginPatient(@Arg('inputs') inputs: PatientLoginInput) {
        let patient;
        try {
            patient = await this.db.collection('Patients').findOne({ email: inputs.email });
            if (!patient) return { message: 'No account found' };
            const isMatchPassword = await verify(patient.password, inputs.password);
            if (!isMatchPassword) {
                return { message: 'Wrong Password' };
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        const accessToken = sign({ id: patient._id }, JWT_KEY);
        return {
            message: 'Matched user',
            accessToken,
            role: 'patient',
            id: patient._id,
            email: patient.email
        };
    }

    @Query(() => [Patient])
    async getPatients() {
        let patients;
        try {
            patients = this.db.collection('Patients').find();
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        const result = await patients.toArray();
        return result;
    }
    @Query(() => Patient)
    async getPatient(@Arg('id') id: string) {
        let patient;
        try {
            patient = await this.db.collection('Patients').findOne({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return patient;
    }
    @Query(() => DoctorOfPatient)
    async getDoctorOfPatient(@Arg('id') id: string) {
        let doctor, patient;
        try {
            patient = await this.db.collection('Patients').findOne({ _id: new ObjectId(id) });
            if (patient) {
                doctor = await this.db.collection('Doctors').findOne({ _id: new ObjectId(patient.doctorId) });
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return doctor;
    }

    @Query(() => Patient)
    async getPatientFromDevice(@Arg('id') id: string) {
        let patient;
        try {
            patient = await this.db.collection('Patients').findOne({ deviceId: id });
            if (!patient) {
                throw new Error('No patient founded with this device id');
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return patient;
    }

    @Mutation(() => String)
    async createPatient(@Arg('inputs') inputs: PatientCreateInput) {
        let result;
        let emailToCheck;
        try {
            emailToCheck = await this.db.collection('Patients').findOne({ email: inputs.email });
            if (emailToCheck) {
                return 'This account already exists';
            }
            const hashPassword = await hash(inputs.password);
            const patientId = new ObjectId();
            const deviceId = new ObjectId();
            await this.db.collection('Devices').insertOne({
                _id: deviceId,
                name: 'stroke-device',
                isConnect: false,
                temperature: [],
                humidity: [],
                SpO2: [],
                heartRate: [],
                bodyTemp: [],
                SpO2Threshold: undefined,
                heartRateThreshold: undefined,
                bodyTempThreshold: undefined,
                medicine: undefined,
                position: undefined,
                patientId: patientId.toString(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
            result = await this.db.collection('Patients').insertOne({
                ...inputs,
                _id: patientId,
                deviceId: deviceId.toString(),
                password: hashPassword
            });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return `Create new account successfully with ID: ${result.insertedId}`;
    }

    @Mutation(() => String)
    async updatePatient(@Arg('inputs') inputs: PatientUpdateInput) {
        let patient, hashPassword;
        const { _id, testId, exerciseSessionId, ...updateObject } = inputs;
        const id = new ObjectId(_id);
        const pushedInput = {
            testId,
            exerciseSessionId
        };
        try {
            if (inputs.password) {
                hashPassword = await hash(inputs.password);
                updateObject.password = hashPassword;
            }
            if (Object.values(pushedInput).some((v) => v)) {
                // @ts-ignore
                patient = await this.db.collection('Patients').findOneAndUpdate({ _id: id }, { $push: pushedInput });
            } else {
                patient = await this.db.collection('Patients').findOneAndUpdate({ _id: id }, { $set: updateObject });
            }
            if (updateObject?.relativePhone) {
                const tempPatient = await this.db.collection('Patients').findOne({ _id: id });
                await mqttPublishRelativePhone(updateObject.relativePhone, tempPatient?.deviceId);
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        if (patient?.value) {
            return `Update a patient successfully with ID: ${patient.value._id}`;
        } else throw new Error('Failed to update');
    }
    @Mutation(() => String)
    async deletePatient(@Arg('id') id: string) {
        let patient;
        try {
            patient = await this.db.collection('Patients').findOneAndDelete({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        if (patient?.value) {
            return `Delete a patient successfully with ID: ${patient.value._id}`;
        } else throw new Error('Failed to delete');
    }
    // @Mutation(() => String)
    // async updateMedicine(@Arg('inputs') inputs: UpdateMedicineInput) {
    //   const { _id, ...updateObject } = inputs;

    //   const id = new ObjectId(_id);
    //   let patient;
    //   try {
    //     patient = await this.db
    //       .collection('Patients')
    //       .findOneAndUpdate({ _id: id }, { $set: updateObject });
    //   } catch (error) {
    //     logger.error(error);
    //     throw new Error(error);
    //   }
    //   if (patient.value) {
    //     return `Update medicines successfully for patient with ID: ${patient.value._id}`;
    //   } else throw new Error('Failed to update');
    // }

    @Mutation(() => String)
    async updateRecord(@Arg('inputs') inputs: UpdateRecordInput) {
        const { _id, ...updateObject } = inputs;

        const id = new ObjectId(_id);
        let patient;
        try {
            patient = await this.db.collection('Patients').findOneAndUpdate({ _id: id }, { $set: updateObject });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        if (patient.value) {
            return `Update record successfully for patient with ID: ${patient.value._id}`;
        } else throw new Error('Failed to update');
    }
}

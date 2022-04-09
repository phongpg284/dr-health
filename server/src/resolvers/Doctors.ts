import { sign } from 'jsonwebtoken';
import { hash, verify } from 'argon2';
import { Db, ObjectId } from 'mongodb';
import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Container, { Service } from 'typedi';
import { JWT_KEY } from '../config';
import { logger } from '../config/logger';
import { Base, BaseCreateInput, BaseUpdateInput } from './Base';
import { Patient, Patients } from './Patients';
@InputType()
class DoctorCreateInput extends BaseCreateInput {
    @Field()
    email!: string;

    @Field()
    password!: string;

    @Field()
    fullName!: string;

    @Field({ nullable: true })
    age?: number;

    @Field({ nullable: true })
    gender?: string;

    @Field({ nullable: true })
    birth?: Date;

    @Field({ nullable: true })
    jobPosition?: string;

    @Field({ nullable: true })
    department?: string;

    @Field({ nullable: true })
    phone?: string;

    @Field({ nullable: true })
    education?: string;

    @Field(() => [String], { nullable: true })
    notificationId?: string[];

    @Field(() => [String], { nullable: true })
    patientId?: string[];
}

@InputType()
class DoctorUpdateInput extends BaseUpdateInput {
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
    birth?: Date;

    @Field({ nullable: true })
    jobPosition?: string;

    @Field({ nullable: true })
    department?: string;

    @Field({ nullable: true })
    age?: number;

    @Field({ nullable: true })
    phone?: string;

    @Field({ nullable: true })
    education?: string;

    @Field(() => [String], { nullable: true })
    notificationId?: string[];

    @Field(() => [String], { nullable: true })
    patientId?: string[];

    @Field({ nullable: true })
    avatar?: string;
}

@InputType()
class DoctorLoginInput {
    @Field()
    email!: string;

    @Field()
    password!: string;
}

@ObjectType()
class DoctorLoginResponse {
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
export class Doctor extends Base {
    @Field(() => ID)
    _id!: string;

    @Field()
    fullName!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;

    @Field({ nullable: true })
    gender?: string;

    @Field({ nullable: true })
    birth?: Date;

    @Field({ nullable: true })
    jobPosition?: string;

    @Field({ nullable: true })
    department?: string;

    @Field({ nullable: true })
    avatar?: string;

    @Field({ nullable: true })
    age?: number;

    @Field({ nullable: true })
    phone?: string;

    @Field({ nullable: true })
    education?: string;

    @Field(() => [String], { nullable: true })
    notificationId?: string[];

    @Field(() => [String], { nullable: true })
    patientId?: string[];
}

@Service()
@Service('Doctors')
@Resolver()
export class Doctors {
    private db: Db;
    private patientResolver: Patients;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.db = Container.get('db');
        this.patientResolver = Container.get('Patients');
    }
    @Query(() => DoctorLoginResponse)
    async loginDoctor(@Arg('inputs') inputs: DoctorLoginInput) {
        let doctor;
        try {
            doctor = await this.db.collection('Doctors').findOne({ email: inputs.email });
            if (!doctor) return { message: 'No account found' };
            const isMatchPassword = await verify(doctor.password, inputs.password);
            if (!isMatchPassword) {
                return { message: 'Wrong Password' };
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        const accessToken = sign({ id: doctor._id }, JWT_KEY);
        return {
            message: 'Matched user',
            accessToken,
            role: 'doctor',
            id: doctor._id,
            email: doctor.email
        };
    }

    @Query(() => [Doctor])
    async getDoctors() {
        let doctors;
        try {
            doctors = this.db.collection('Doctors').find();
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        const result = await doctors.toArray();
        return result;
    }
    @Query(() => Doctor)
    async getDoctor(@Arg('id') id: string) {
        let doctor;
        try {
            doctor = await this.db.collection('Doctors').findOne({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return doctor;
    }

    @Query(() => [Patient])
    async getPatientsOfDoctor(@Arg('id') id: string) {
        let doctor;
        let result: any[] = [];
        try {
            doctor = await this.db.collection('Doctors').findOne({ _id: new ObjectId(id) });
            if (!doctor) throw new Error('Can not find doctor!');

            if (doctor.patientId) {
                const objectIdOfPatients = doctor.patientId.map((id: string) => new ObjectId(id));
                const patientsArray = await this.db
                    .collection('Patients')
                    .find({
                        _id: { $in: objectIdOfPatients }
                    })
                    .toArray();
                result = patientsArray.map((patient) => {
                    let { notificationId, password, ...data } = patient;
                    return data;
                });
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return result;
    }

    @Mutation(() => String)
    async createDoctor(@Arg('inputs') inputs: DoctorCreateInput) {
        let result;
        let emailToCheck;

        try {
            emailToCheck = await this.db.collection('Doctors').findOne({ email: inputs.email });
            if (emailToCheck) {
                return 'This account already exists';
            }
            const hashPassword = await hash(inputs.password);
            result = await this.db.collection('Doctors').insertOne({
                ...inputs,
                password: hashPassword
            });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return `Create new account successfully with ID: ${result.insertedId}`;
    }

    @Mutation(() => String)
    async updateDoctor(@Arg('inputs') inputs: DoctorUpdateInput) {
        let doctor, hashPassword;
        const { _id, ...updateObject } = inputs;
        const id = new ObjectId(_id);
        try {
            if (inputs.password) {
                hashPassword = await hash(inputs.password);
                updateObject.password = hashPassword;
            }

            if (inputs.patientId) {
                const oldPatients = await this.getPatientsOfDoctor(_id);
                if (oldPatients) {
                    const tasks = [];
                    for (const patient of oldPatients) {
                        tasks.push(
                            // @ts-ignore
                            this.patientResolver.updatePatient({
                                _id: patient._id,
                                doctorId: patient.doctorId.filter((id: string) => id !== _id)
                            })
                        );
                    }
                    await Promise.all(tasks);
                }
            }

            doctor = await this.db.collection('Doctors').findOneAndUpdate({ _id: id }, { $set: updateObject });

            if (inputs.patientId) {
                const newPatientsId = inputs.patientId;
                const tasks = [];
                for (const patientId of newPatientsId) {
                    tasks.push(
                        this.patientResolver.getPatient(patientId).then((patient) => {
                            if (!patient) throw new Error('No patient found!');
                            //@ts-ignore
                            this.patientResolver.updatePatient({
                                _id: patientId,
                                doctorId: patient!.doctorId ? patient.doctorId.concat(patientId) : patientId
                            });
                        })
                    );
                }
                await Promise.all(tasks);
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        if (doctor?.value) {
            return `Update a doctor successfully with ID: ${doctor.value._id}`;
        } else throw new Error('Failed to update');
    }

    @Mutation(() => String)
    async deleteDoctor(@Arg('id') id: string) {
        let doctor;
        try {
            doctor = await this.db.collection('Doctors').findOneAndDelete({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        if (doctor?.value) {
            return `Delete a doctor successfully with ID: ${doctor.value._id}`;
        } else throw new Error('Failed to delete');
    }
}

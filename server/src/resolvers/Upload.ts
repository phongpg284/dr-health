import { Arg, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import Container, { Service } from 'typedi';
import { BaseCreateInput } from './Base';
import { Doctors } from './Doctors';
import { Patients } from './Patients';
import { Db } from 'mongodb';
import mkdirp from 'mkdirp';
import { mqttPublishRecord } from '../mqtt/handler';
import { DOWNLOAD_DOMAIN } from '../config';
@ObjectType()
class UploadFile {
    @Field()
    id!: string;

    @Field()
    path!: string;
}

@InputType()
class SingleUploadFileInput extends BaseCreateInput {
    @Field()
    ownerId!: string;

    @Field()
    receiverId!: string;

    @Field(() => GraphQLUpload)
    file!: FileUpload;
}

@Service()
@Resolver()
export class UploadFiles {
    private readonly UPLOAD_PATH = `./upload`;

    private readonly db: Db;
    private readonly doctorResolver: Doctors;
    private readonly patientResolver: Patients;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.doctorResolver = Container.get('Doctors');
        this.patientResolver = Container.get('Patients');
        this.db = Container.get('db');
    }

    @Mutation(() => String)
    async singleUploadFile(
        @Arg('inputs')
        inputs: SingleUploadFileInput
    ) {
        const { file, ownerId, receiverId, createdAt, updatedAt } = inputs;
        const fileData = await file;

        let doctor, patient;
        try {
            doctor = await this.doctorResolver.getDoctor(ownerId);
            patient = await this.patientResolver.getPatient(receiverId);
        } catch (err) {
            throw new Error(err);
        }

        if (!doctor) throw new Error('No doctor found!');
        if (!patient) throw new Error('No patient found!');

        const OWNER_PATH = `patient_${receiverId}`;
        await mkdirp(`${this.UPLOAD_PATH}/${OWNER_PATH}`);

        const fullPath = await new Promise<string>((resolve, reject) => {
            fileData
                .createReadStream()
                .pipe(createWriteStream(`${this.UPLOAD_PATH}/${OWNER_PATH}/${fileData.filename}`))
                .on('error', reject)
                .on('finish', () => {
                    resolve(`${this.UPLOAD_PATH}/${OWNER_PATH}/${fileData.filename}`);
                });
        });

        const insertRecordData = {
            ownerId: ownerId,
            receiverId: receiverId,
            path: fullPath,
            createdAt: createdAt,
            updatedAt: updatedAt,
            fileName: fileData.filename
        };

        const downloadLink = DOWNLOAD_DOMAIN + '/download/' + receiverId + '/' + fileData.filename;
        try {
            await this.db.collection('records').insertOne(insertRecordData);
            await mqttPublishRecord(downloadLink, fileData.filename, patient.deviceId);
        } catch (err) {
            throw new Error(err);
        }
        return `Upload successfully`;
    }
}

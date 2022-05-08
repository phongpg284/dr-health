import { Db, Document, ModifyResult, ObjectId } from 'mongodb';
import { Arg, Field, ID, InputType, Mutation, ObjectType, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from 'type-graphql';
import Container, { Service } from 'typedi';

import { Base, BaseCreateInput, BaseUpdateInput } from './Base';
import { Accounts } from './Account';
import { Doctors } from './Doctors';
import { Patients } from './Patients';

import { logger } from '../config/logger';

@InputType()
class GetAccountBloodInput {
    @Field()
    id!: string;

    @Field()
    role!: string;
}

@InputType()
class BloodCreateInput extends BaseCreateInput {
    @Field(() => ID)
    patientId!: string;

    @Field({
        description: 'Số lượng hồng cầu (T/L)'
    })
    rbc!: number;

    @Field({
        description: 'Lượng huyết sắc tố (d/dL)'
    })
    hgb!: number;

    @Field({ description: 'Thể tích khối hồng cầu (%)' })
    hct: number;

    @Field({ description: 'Thể tích trung bình hồng cầu (fL)' })
    mcv: number;

    @Field({ description: 'Lượng huyết sắc tố trung bình hồng cầu (pg)' })
    mch: number;

    @Field({
        description: 'Nồng độ huyết sắc tố trung bình hồng cầu (g/dL)'
    })
    mchc: number;

    @Field({
        description: 'Độ phân bố kích thước hồng cầu (%)'
    })
    rdw: number;

    @Field({
        description: 'Số lượng bạch cầu (G/L)'
    })
    wbc: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu đoạn trung tính (%)'
    })
    neutrophil: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu lympho (%)'
    })
    lymphocy: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu mono (%)'
    })
    monocyte: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu đoạn ưa axit (%)'
    })
    eosinophil: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu đoạn ưa base (%)'
    })
    basophil: number;

    @Field({
        description: 'Số lượng bạch cầu đoạn trung tính (G/L)'
    })
    neut: number;

    @Field({
        description: 'Số lượng bạch cầu lympho (G/L)'
    })
    lym: number;

    @Field({
        description: 'Số lượng bạch cầu Mono (G/L)'
    })
    mon: number;

    @Field({
        description: 'Số lượng bạch cầu đoạn ưa axit (G/L)'
    })
    eos: number;

    @Field({
        description: 'Số lượng bạch cầu đoạn ưa base (G/L)'
    })
    baso: number;

    @Field({
        description: 'Số lượng tiểu cầu (G/L)'
    })
    plt: number;

    @Field({
        description: 'Thể tích trung bình tiểu cầu (fL)'
    })
    mpv: number;

    @Field({
        description: 'Thể tích khối tiểu cầu (%)'
    })
    pct: number;

    @Field({
        description: 'Độ phân bố kích thước tiểu cầu (%)'
    })
    pdw: number;
}

@ObjectType()
export class Blood extends Base {
    @Field(() => ID)
    _id!: string;

    @Field({
        description: 'Số lượng hồng cầu (T/L)'
    })
    rbc!: number;

    @Field({
        description: 'Lượng huyết sắc tố (d/dL)'
    })
    hgb!: number;

    @Field({ description: 'Thể tích khối hồng cầu (%)' })
    hct: number;

    @Field({ description: 'Thể tích trung bình hồng cầu (fL)' })
    mcv: number;

    @Field({ description: 'Lượng huyết sắc tố trung bình hồng cầu (pg)' })
    mch: number;

    @Field({
        description: 'Nồng độ huyết sắc tố trung bình hồng cầu (g/dL)'
    })
    mchc: number;

    @Field({
        description: 'Độ phân bố kích thước hồng cầu (%)'
    })
    rdw: number;

    @Field({
        description: 'Số lượng bạch cầu (G/L)'
    })
    wbc: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu đoạn trung tính (%)'
    })
    neutrophil: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu lympho (%)'
    })
    lymphocy: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu mono (%)'
    })
    monocyte: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu đoạn ưa axit (%)'
    })
    eosinophil: number;

    @Field({
        description: 'Tỷ lệ phần trăm bạch cầu đoạn ưa base (%)'
    })
    basophil: number;

    @Field({
        description: 'Số lượng bạch cầu đoạn trung tính (G/L)'
    })
    neut: number;

    @Field({
        description: 'Số lượng bạch cầu lympho (G/L)'
    })
    lym: number;

    @Field({
        description: 'Số lượng bạch cầu Mono (G/L)'
    })
    mon: number;

    @Field({
        description: 'Số lượng bạch cầu đoạn ưa axit (G/L)'
    })
    eos: number;

    @Field({
        description: 'Số lượng bạch cầu đoạn ưa base (G/L)'
    })
    baso: number;

    @Field({
        description: 'Số lượng tiểu cầu (G/L)'
    })
    plt: number;

    @Field({
        description: 'Thể tích trung bình tiểu cầu (fL)'
    })
    mpv: number;

    @Field({
        description: 'Thể tích khối tiểu cầu (%)'
    })
    pct: number;

    @Field({
        description: 'Độ phân bố kích thước tiểu cầu (%)'
    })
    pdw: number;
}

@Resolver()
@Service()
@Service('Bloods')
export class Notifications {
    private db: Db;
    private readonly accountResolver: Accounts;
    private readonly doctorResolver: Doctors;
    private readonly patientResolver: Patients;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.accountResolver = Container.get('Accounts');
        this.doctorResolver = Container.get('Doctors');
        this.patientResolver = Container.get('Patients');
        this.db = Container.get('db');
    }

    @Query(() => Blood)
    async getAccountBlood(@Arg('inputs') inputs: GetAccountBloodInput) {
        let account;
        try {
            if (inputs.role === 'doctor') account = await this.doctorResolver.getDoctor(inputs.id);
            if (inputs.role === 'patient') account = await this.patientResolver.getPatient(inputs.id);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        if (!account) throw new Error('No account found!');
        return this.db.collection('Bloods').findOne({ patientId: account._id.toString() });
    }

    @Mutation(() => String)
    async createPatientBlood(@Arg('inputs') inputs: BloodCreateInput) {
        let result;
        let existingPatient;
        try {
            existingPatient = await this.patientResolver.getPatient(inputs.patientId);
            if (!existingPatient) {
                return 'This patient does not already exists';
            }

            const bloodId = new ObjectId();

            result = await this.db.collection('Bloods').insertOne({
                ...inputs,
                _id: bloodId
            });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return `Create new patient blood successfully with ID: ${result.insertedId}`;
    }
}

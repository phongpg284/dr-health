import { Db } from 'mongodb';
import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Container, Service } from 'typedi';

import { BaseCreateInput } from './Base';
import { logger } from '../config/logger';
import { Devices } from './Devices';

@InputType('UseDeviceCreateInput')
class UseDeviceCreateInput extends BaseCreateInput {
    @Field()
    useDeviceId!: string;

    @Field()
    topicCode!: string;
}

/* Object type */
@ObjectType('UseDeviceType')
class UseDevice {
    @Field(() => ID)
    useDeviceId!: string;

    @Field()
    topicCode!: string;
}

@Service()
@Service('UseDevices')
@Resolver()
export class UseDevices {
    private db: Db;
    private deviceResolver: Devices;
    constructor() {
        this.db = Container.get('db');
        this.deviceResolver = Container.get('Devices');
    }
    @Mutation(() => String)
    async createUseDevice(@Arg('inputs') inputs: UseDeviceCreateInput) {
        try {
            const result = await this.db.collection('UseDevices').insertOne({
                ...inputs
            });
            if (!result) {
                throw new Error('Create Use Device unsuccessfully!');
            }
            return `Create new Use Device successfully with ID: ${result.insertedId}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => UseDevice)
    async getUseDevice(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('UseDevices').findOne({ useDeviceId: id });
            if (!result) {
                return Error('This device is not using!');
            }
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }
    @Query(() => UseDevice)
    async getUseDeviceByCode(@Arg('name') code: string) {
        try {
            const useDevice = await this.db.collection('UseDevices').findOne({ topicCode: code });
            if (!useDevice) {
                logger.error('Can not find UseDevice!');
                return;
            }
            return useDevice;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Mutation(() => String)
    async deleteUseDevice(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('UseDevices').findOneAndDelete({ useDeviceId: id });
            if (!result) {
                throw new Error('Can not find UseDevice!');
            }
            return `Delete UseDevice successfully with ID: ${result.value?._id}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }
}

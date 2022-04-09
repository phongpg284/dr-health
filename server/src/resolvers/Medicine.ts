import { Db, ObjectId } from 'mongodb';
import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Container, { Service } from 'typedi';

import { BaseCreateInput, BaseUpdateInput } from './Base';

import { logger } from '../config/logger';

@InputType()
class MedicineCreateInput extends BaseCreateInput {
    @Field()
    name!: string;
}

@InputType()
class MedicineUpdateInput extends BaseUpdateInput {
    @Field()
    _id!: string;

    @Field({ nullable: true })
    name?: string;
}

@ObjectType()
export class Medicine {
    @Field(() => ID)
    _id!: string;

    @Field()
    name!: string;
}

@Service()
@Service('Medicines')
@Resolver()
export class Medicines {
    private db: Db;
    constructor() {
        this.db = Container.get('db');
    }

    @Query(() => [Medicine])
    async getMedicines() {
        let medicines;
        try {
            medicines = this.db.collection('Medicines').find();
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        const result = await medicines.toArray();
        return result;
    }
    @Query(() => Medicine)
    async getMedicine(@Arg('id') id: string) {
        let medicine;
        try {
            medicine = await this.db.collection('Medicines').findOne({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return Medicine;
    }

    @Mutation(() => String)
    async createMedicine(@Arg('inputs') inputs: MedicineCreateInput) {
        let result;
        try {
            result = await this.db.collection('Medicines').insertOne(inputs);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return `Create new medicine successfully with ID: ${result.insertedId}`;
    }

    @Mutation(() => String)
    async updateMedicine(@Arg('inputs') inputs: MedicineUpdateInput) {
        let medicine;
        const { _id, ...updateObject } = inputs;
        const id = new ObjectId(_id);
        try {
            medicine = await this.db.collection('Medicines').findOneAndUpdate({ _id: id }, { $set: updateObject });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        if (medicine?.value) {
            return `Update a Medicine successfully with ID: ${medicine.value._id}`;
        } else throw new Error('Failed to update');
    }

    @Mutation(() => String)
    async deleteMedicine(@Arg('id') id: string) {
        let medicine;
        try {
            medicine = await this.db.collection('Medicines').findOneAndDelete({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        if (medicine?.value) {
            return `Delete a Medicine successfully with ID: ${medicine.value._id}`;
        } else throw new Error('Failed to delete');
    }
}

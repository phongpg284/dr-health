import { Db } from 'mongodb';
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Container, Service } from 'typedi';

import { BaseCreateInput, BaseUpdateInput } from './Base';
import { logger } from '../config/logger';

@InputType()
class QuestionUpdateInput extends BaseUpdateInput {
    @Field({ nullable: true })
    id?: string;

    @Field({ nullable: true })
    title?: string;

    @Field(() => [String], { nullable: true })
    options?: string[];
}

@InputType()
class QuestionCreateInput extends BaseCreateInput {
    @Field()
    id: string;

    @Field()
    title!: string;

    @Field(() => [String])
    options!: string[];
}
/* Object type */
@ObjectType()
class Question {
    @Field()
    id: string;

    @Field()
    title!: string;

    @Field(() => [String])
    options!: string[];
}

@Service()
@Service('Questions')
@Resolver()
export class Questions {
    private db: Db;
    constructor() {
        this.db = Container.get('db');
    }
    @Mutation(() => String)
    async createQuestion(@Arg('inputs') inputs: QuestionCreateInput) {
        try {
            const result = await this.db.collection('Questions').insertOne(inputs);
            if (!result) {
                throw new Error('Create Question unsuccessfully!');
            }
            return `Create new Question successfully with ID: ${result.insertedId}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => Question)
    async getQuestion(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('Questions').findOne({ id: id });
            if (!result) {
                return Error('Cant find question!');
            }
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => [Question])
    async getQuestions() {
        try {
            const result = await this.db.collection('Questions').find({}).toArray();
            if (!result) {
                return Error('Cant find question!');
            }
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => [Question])
    async clientGetQuestions() {
        const blacklistQuestions = ['1b', '4', '5'];
        try {
            const result = await this.db
                .collection('Questions')
                .find({ id: { $nin: blacklistQuestions } })
                .toArray();
            if (!result) {
                return Error('Cant find question!');
            }
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Mutation(() => String)
    async deleteQuestion(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('Questions').findOneAndDelete({ id: id });
            if (!result) {
                throw new Error('Can not find Question!');
            }
            return `Delete Question successfully with ID: ${result.value?._id}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }
}

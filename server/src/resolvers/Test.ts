import { Db, ObjectId } from 'mongodb';
import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Container, Service } from 'typedi';

import { Base, BaseCreateInput, BaseUpdateInput } from './Base';
import { logger } from '../config/logger';
import { Devices } from './Devices';
import { Patients } from './Patients';
import { Questions } from './Question';
import { TestSumbitTeam } from '../utils/Enums';

@InputType('QuestionInputType')
@ObjectType()
export class QuestionResult {
    @Field()
    id!: string;

    @Field()
    point!: number;

    @Field({ nullable: true })
    title?: string;

    @Field(() => [String], { nullable: true })
    options?: string[];
}

@InputType()
class TestUpdateInput extends BaseUpdateInput {
    @Field()
    id!: string;

    @Field(() => [QuestionResult], { nullable: true })
    questions?: QuestionResult[];

    @Field({ nullable: true })
    patientId?: string;

    @Field({ nullable: true })
    conclusion?: string;

    @Field({ nullable: true })
    senderCode?: number;
}
@InputType()
class UploadTestInput {
    @Field()
    patientId!: string;

    @Field(() => [QuestionResult], { nullable: true })
    questions?: QuestionResult[];
}

@InputType()
class TestCreateInput extends BaseCreateInput {
    @Field(() => [QuestionResult])
    questions!: QuestionResult[];

    @Field()
    patientId!: string;

    @Field({ nullable: true })
    senderCode?: number;
}

/* Object type */
@ObjectType()
class Test extends Base {
    @Field(() => ID)
    _id!: string;

    @Field(() => [QuestionResult])
    questions!: QuestionResult[];

    @Field()
    totalPoint!: number;

    @Field()
    patientId!: string;

    @Field(() => [Number])
    teamCodeSubmitted!: number[];
}

@Service()
@Service('Tests')
@Resolver()
export class Tests {
    private db: Db;
    private patientResolver: Patients;
    private questionResolver: Questions;
    constructor() {
        this.db = Container.get('db');
        this.patientResolver = Container.get('Patients');
        this.questionResolver = Container.get('Questions');
    }
    @Mutation(() => String)
    async createTest(@Arg('inputs') inputs: TestCreateInput) {
        try {
            const totalPoint = inputs.questions.reduce((prev, current) => prev + current.point, 0);
            const result = await this.db.collection('Tests').insertOne({
                ...inputs,
                teamCodeSubmitted: [inputs.senderCode],
                totalPoint
            });
            if (!result) {
                throw new Error('Create Test unsuccessfully!');
            }
            const patient = await this.patientResolver.updatePatient({
                _id: inputs.patientId,
                testId: result.insertedId.toHexString(),
                updatedAt: new Date()
            });
            if (!patient) {
                throw new Error('Error update patient');
            }

            return `Create new Test successfully with ID: ${result.insertedId}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => Test)
    async getTest(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('Tests').findOne({ _id: new ObjectId(id) });
            if (!result) {
                return Error('Test not found!');
            }
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => Test)
    async getRecentCompleteTest(@Arg('id') id: string) {
        try {
            const result = await this.db
                .collection('Tests')
                .find({ patientId: new ObjectId(id), teamCodeSubmitted: [0, 1, 2] })
                .toArray();
            if (!result) {
                return Error('Test not found!');
            }
            return result[result.length - 1];
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => [Test])
    async getAllTests(@Arg('id') id: string) {
        try {
            const result = await this.db
                .collection('Tests')
                .find({ patientId: new ObjectId(id) })
                .toArray();
            if (!result) {
                return Error('Test not found!');
            }
            const allQuestions = await this.questionResolver.getQuestions();
            const newResult = result.map((test) => {
                const newQuestionsDetail = test.questions.map((question: any) => {
                    //@ts-ignore
                    const questionDetail = allQuestions.find((element) => element.id === question.id);
                    return {
                        ...question,
                        ...questionDetail
                    };
                });
                return {
                    ...test,
                    questions: newQuestionsDetail
                };
            });
            return newResult;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Mutation(() => String)
    async updateTest(@Arg('inputs') inputs: TestUpdateInput) {
        const { id, patientId, conclusion, updatedAt, questions } = inputs;
        try {
            const test = await this.getTest(id);
            if (!test) {
                return 'Cant find test!';
            }

            const teamCodeSubmitted: number[] | [] = test.teamCodeSubmitted;

            //@ts-ignore
            if (teamCodeSubmitted.includes(inputs.senderCode)) {
                const currentQuestions: QuestionResult[] = test.questions;
                const newQuestions = inputs.questions;
                // @ts-ignore
                const currentConvertObject = currentQuestions.reduce((obj, current) => ((obj[current.id] = current.point), obj), {});
                // @ts-ignore
                const newConvertObject = newQuestions.reduce((obj, current) => ((obj[current.id] = current.point), obj), {});

                const newQuestionsInsert = Object.entries({ ...currentConvertObject, ...newConvertObject }).map(([key, value]: [string, number]) => ({ id: key, point: value }));
                const totalPoint = newQuestionsInsert.reduce((prev, current) => prev + current.point, 0);

                const updateTest = await this.db.collection('Tests').findOneAndUpdate(
                    { _id: id },
                    //@ts-ignore
                    { $set: { questions: newQuestionsInsert, totalPoint, conclusion, updatedAt: new Date() } }
                );
                if (!updateTest) {
                    logger.error('Can not find Test!');
                    return;
                }
            } else {
                const totalPoint = inputs.questions.reduce((prev, current) => prev + current.point, 0);
                const updateTest = await this.db.collection('Tests').findOneAndUpdate(
                    { _id: id },
                    {
                        //@ts-ignore
                        $push: { questions: { $each: questions }, teamCodeSubmitted: inputs.senderCode },
                        $set: { conclusion, updatedAt: new Date() },
                        $inc: { totalPoint }
                    }
                );
                if (!updateTest) {
                    logger.error('Can not find Test!');
                    return;
                }
            }
            return test;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Mutation(() => String)
    async uploadTest(@Arg('inputs') inputs: UploadTestInput) {
        const { patientId, questions } = inputs;
        try {
            const deviceObject = new Devices();

            const result = await deviceObject.addNewTest(patientId, 'patient', questions, TestSumbitTeam.Web);
            if (!result) {
                logger.error('Can not find Test!');
                return;
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return 'Upload test successfully';
    }

    @Mutation(() => String)
    async deleteTest(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('Tests').findOneAndDelete({ testId: id });
            if (!result) {
                throw new Error('Can not find Test!');
            }
            return `Delete Test successfully with ID: ${result.value?._id}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }
}

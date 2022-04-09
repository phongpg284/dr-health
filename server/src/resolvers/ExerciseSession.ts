import * as fs from 'fs';
import yaml from 'js-yaml';
import { evaluate } from 'mathjs';
import { Db } from 'mongodb';
import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Container, Service } from 'typedi';
import { logger } from '../config/logger';

import { Base, BaseCreateInput, BaseUpdateInput } from './Base';
import { ExerciseData, Patients } from './Patients';

export type ExerciseStepError = 'rightHand' | 'leftHand' | '';
export type ArmCoordinate = [Number, Number, Number][];

@InputType('BodyCoordinateInputType')
@ObjectType()
export class BodyCoordinate {
    @Field(() => [Number, Number, Number])
    leftHand!: ArmCoordinate;

    @Field(() => [Number, Number, Number])
    rightHand!: ArmCoordinate;
}

@InputType('ExerciseStepInputType')
@ObjectType()
export class ExerciseStep extends BaseCreateInput {
    @Field()
    id!: number;

    @Field({ nullable: true })
    fail?: ExerciseStepError;

    @Field(() => BodyCoordinate, { nullable: true })
    bodyCoordinate?: BodyCoordinate;
}

@InputType()
class ExerciseSessionUpdateInput extends BaseUpdateInput {
    @Field(() => ID)
    _id!: string;

    @Field({ nullable: true })
    sessionId?: string;

    @Field({ nullable: true })
    exerciseKey?: number;

    @Field(() => [ExerciseStep], { nullable: true })
    step?: ExerciseStep[];

    @Field({ nullable: true })
    patientId?: string;
}

@InputType()
class ExerciseSessionStepUpdateInput extends BaseUpdateInput {
    @Field()
    sessionId!: string;

    @Field(() => ExerciseStep)
    step!: ExerciseStep;
}

@InputType()
class ExerciseSessionCreateInput extends BaseCreateInput {
    @Field()
    sessionId!: string;

    @Field()
    exerciseKey!: number;

    @Field(() => [ExerciseStep], { nullable: true })
    step?: ExerciseStep[];

    @Field()
    patientId!: string;
}

@ObjectType()
class ExerciseSession extends Base {
    @Field(() => ID)
    _id!: string;

    @Field()
    sessionId!: string;

    @Field()
    exerciseKey!: number;

    @Field(() => [ExerciseStep], { nullable: true })
    step?: ExerciseStep;

    @Field()
    patientId!: string;
}

@Service()
@Service('ExerciseSessions')
@Resolver()
export class ExerciseSessions {
    private db: Db;
    private patientResolver: Patients;
    constructor() {
        this.db = Container.get('db');
        this.patientResolver = Container.get('Patients');
    }
    @Mutation(() => String)
    async createExercise(@Arg('inputs') inputs: ExerciseSessionCreateInput) {
        try {
            const result = await this.db.collection('ExerciseSessions').insertOne({
                ...inputs
            });
            if (!result) {
                throw new Error('Create ExerciseSession unsuccessfully!');
            }
            const patient = await this.patientResolver.updatePatient({
                _id: inputs.patientId,
                exerciseSessionId: inputs.sessionId,
                updatedAt: new Date()
            });
            if (!patient) {
                throw new Error('Error update patient');
            }

            return `Create new ExerciseSession successfully with ID: ${result.insertedId}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => ExerciseSession)
    async getExerciseSession(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('ExerciseSessions').findOne({ sessionId: id });
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Query(() => [ExerciseSession])
    async getAllExercisesOfPatient(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('ExerciseSessions').find({ patientId: id }).toArray();
            if (!result) {
                return Error('ExerciseSession not found!');
            }
            return result;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Mutation(() => String)
    async updateExerciseSession(@Arg('inputs') inputs: ExerciseSessionUpdateInput) {
        const { _id, ...restInputs } = inputs;
        try {
            const updateExerciseSession = await this.db.collection('ExerciseSessions').findOneAndUpdate(
                { _id: _id },
                //@ts-ignore
                { $set: { ...restInputs, updatedAt: new Date() } }
            );

            return updateExerciseSession;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Mutation(() => String)
    async updateExerciseSessionStep(@Arg('inputs') inputs: ExerciseSessionStepUpdateInput) {
        const { sessionId, step } = inputs;
        try {
            const result = await this.db.collection('ExerciseSessions').findOneAndUpdate(
                { sessionId },
                {
                    //@ts-ignore
                    $push: { step }
                }
            );
            //@ts-ignore
            if (result.ok === 1) return 'Successfully update exercise session step';
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    @Mutation(() => String)
    async deleteExerciseSession(@Arg('id') id: string) {
        try {
            const result = await this.db.collection('ExerciseSessions').findOneAndDelete({ sessionId: id });
            if (!result) {
                throw new Error('Can not find Exercise!');
            }
            return `Delete ExerciseSession successfully with ID: ${result.value?._id}`;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async calculateExerciseData(patientId: string, data: ExerciseData) {
        const patient = await this.patientResolver.getPatient(patientId);
        const shoulderToElbow = patient?.calculateStats?.shoulderToElbow;
        const elbowToWrist = patient?.calculateStats?.elbowToWrist;
        const { id, exerciseKey, step, leftHand, rightHand } = data;

        const r0: [number, number, number] = [0, 0, 0];
        const l0: [number, number, number] = [0, 0, 0];

        const rightHandValue = [r0, ...rightHand];
        const leftHandValue = [l0, ...leftHand];

        let doc;
        try {
            doc = yaml.load(fs.readFileSync(__dirname + '/../../exercises.yaml', 'utf8'));
        } catch (e) {
            return;
        }

        const exerciseDoc = (doc as any).exercises.find((e: any) => e.id === exerciseKey);
        if (!exerciseDoc) return 'Wrong ExerciseKey!';

        const diff = ((doc as any).diff_percentage ?? 0) / 100;

        const stepDoc = exerciseDoc.step.find((s: any) => s.id === step);
        if (!stepDoc) return 'Wrong Step!';

        const checkValidCoordinate = (coord: [number, number, number], validCoord: [number, number, number], diff: number) => {
            let isValid = true;
            const validCoordRange = validCoord.map((axis: number) => {
                return {
                    min: axis - axis * diff,
                    max: axis + axis * diff
                };
            });
            coord.forEach((axis: number, index: number) => {
                if (axis < validCoordRange[index].min || axis > validCoordRange[index].max) {
                    isValid = false;
                }
            });
            return isValid;
        };

        let validResult: ExerciseStepError = '';

        function escapeRegExp(string: string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        }

        function replaceAll(str: string, find: string, replace: string) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }

        const convertMathFormula = (formula: any, d: number, d_sub: number) => {
            return formula.map((coord: any) => {
                if (typeof coord === 'number') {
                    return coord;
                } else {
                    const filter1 = replaceAll(coord.toString(), `d'`, d_sub.toString());
                    const filter2 = replaceAll(filter1, 'd', d.toString());
                    const filter3 = replaceAll(filter2, 'pi', Math.PI.toString());

                    const vl = evaluate(filter3);
                    return vl;
                }
            });
        };

        Object.entries(stepDoc).forEach(([key, value]) => {
            if (key === 'leftHand') {
                let isValid = true;
                Object.values(value).forEach((v, index) => {
                    isValid = !checkValidCoordinate(leftHandValue[index], convertMathFormula(v, shoulderToElbow, elbowToWrist), diff) ? false : isValid;
                });
                if (!isValid) validResult = 'leftHand';
            }
            if (key === 'rightHand') {
                let isValid = true;
                Object.values(value).forEach((v, index) => {
                    isValid = !checkValidCoordinate(rightHandValue[index], v, diff) ? false : isValid;
                });
                if (!isValid) validResult = 'rightHand';
            }
        });

        const existExercise = await this.getExerciseSession(id);
        if (!existExercise) {
            await this.createExercise({
                sessionId: id,
                exerciseKey,
                step: [
                    {
                        id: step,
                        fail: validResult,
                        bodyCoordinate: {
                            leftHand: leftHandValue,
                            rightHand: rightHandValue
                        },
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                ],
                patientId: patientId,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } else
            await this.updateExerciseSessionStep({
                sessionId: id,
                step: {
                    id: step,
                    fail: validResult,
                    bodyCoordinate: {
                        leftHand: leftHandValue,
                        rightHand: rightHandValue
                    },
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                updatedAt: new Date()
            });
        return 'Calculate exercise data successfully!';
    }
}

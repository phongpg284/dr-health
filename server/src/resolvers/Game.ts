import mkdirp from 'mkdirp';
import { createWriteStream } from 'fs';
import { Db, ObjectId } from 'mongodb';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Arg, Field, ID, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import Container, { Service } from 'typedi';
import { BaseCreateInput, BaseUpdateInput } from './Base';
import { Patients } from './Patients';
import { logger } from '../config/logger';

@InputType()
class GameCreateInput extends BaseCreateInput {
    @Field()
    patientId!: string;

    @Field()
    type!: number;

    @Field(() => [GraphQLUpload], { nullable: true })
    img?: FileUpload[];

    @Field(() => [String], { nullable: true })
    options?: string[];

    @Field({ nullable: true })
    answer?: number;

    @Field({ nullable: true })
    record?: string;

    @Field({ nullable: true })
    question?: string;
}

@InputType()
class GameUpdateInput extends BaseUpdateInput {
    @Field()
    _id!: string;

    @Field({ nullable: true })
    patientId!: string;

    @Field()
    type!: number;

    @Field(() => [String], { nullable: true })
    imgPath?: string[];

    @Field(() => [String], { nullable: true })
    options?: string[];

    @Field({ nullable: true })
    answer?: number;

    @Field({ nullable: true })
    record?: string;

    @Field({ nullable: true })
    question?: string;

    @Field({ nullable: true })
    pass?: boolean;
}

@InputType()
class GetRandomGameInput extends BaseUpdateInput {
    @Field()
    id!: string;

    @Field()
    count!: number;
}

@ObjectType()
export class Game {
    @Field(() => ID)
    _id!: string;

    @Field()
    patientId!: string;

    @Field()
    type!: number;

    @Field(() => [String], { nullable: true })
    imgPath?: string[];

    @Field(() => [String], { nullable: true })
    imgName?: string[];

    @Field(() => [String], { nullable: true })
    options?: string[];

    @Field({ nullable: true })
    answer?: number;

    @Field({ nullable: true })
    question?: string;

    @Field({ nullable: true })
    record?: string;

    @Field()
    pass!: boolean;
}

@Service()
@Service('Games')
@Resolver()
export class Games {
    private db: Db;
    private patientResolver: Patients;
    private readonly UPLOAD_GAME_PATH = `./games`;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.db = Container.get('db');
        this.patientResolver = Container.get('Patients');
    }

    @Query(() => [Game])
    async getGames() {
        let games;
        try {
            games = this.db.collection('Games').find();
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        const result = await games.toArray();
        return result;
    }
    @Query(() => Game)
    async getGame(@Arg('id') id: string) {
        let game;
        try {
            game = await this.db.collection('Games').findOne({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return game;
    }

    @Query(() => [Game])
    async getGamesByPatient(@Arg('id') id: string) {
        const games = [];
        try {
            const patient = await this.patientResolver.getPatient(id);
            if (!patient) return 'No patient found';

            for (const gameId of patient.games) {
                const game = await this.db.collection('Games').findOne({ _id: new ObjectId(gameId) });
                if (!game) {
                    console.log('No game found!');
                }
                games.push(game);
            }
            if (!games) throw new Error('Can not find Games!');
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return games;
    }

    @Mutation(() => String)
    async createGame(@Arg('inputs') inputs: GameCreateInput) {
        let result;
        const { patientId, img, ...restInput } = inputs;
        const filesData: any[] = [];
        for (const singleImg of img) {
            filesData.push(await singleImg);
        }
        let patient;
        try {
            patient = await this.patientResolver.getPatient(patientId);
        } catch (err) {
            throw new Error(err);
        }

        if (!patient) throw new Error('No patient found!');

        const objectId = new ObjectId();
        await mkdirp(`${this.UPLOAD_GAME_PATH}/${patientId}/Game_${objectId}`);

        const imgPath: string[] = [];
        const imgName: string[] = [];

        for (const singleImg of filesData) {
            const fullPath = await new Promise<string>((resolve, reject) => {
                singleImg
                    .createReadStream()
                    .pipe(createWriteStream(`${this.UPLOAD_GAME_PATH}/${patientId}/Game_${objectId}/${singleImg.filename}`))
                    .on('error', reject)
                    .on('finish', () => {
                        resolve(`${this.UPLOAD_GAME_PATH}/${patientId}/Game_${objectId}/${singleImg.filename}`);
                    });
            });
            imgPath.push(fullPath);
            imgName.push(singleImg.filename);
        }

        const insertGameData = {
            _id: objectId,
            ...restInput,
            patientId: patientId,
            imgPath: imgPath,
            imgName: imgName,
            pass: false
        };

        try {
            result = await this.db.collection('Games').insertOne(insertGameData);
            await this.patientResolver.updatePatient({ _id: patientId, games: patient.games?.concat(result?.insertedId) ?? [result?.insertedId], updatedAt: new Date() });
        } catch (err) {
            throw new Error(err);
        }
        if (result) return `Create new game successfully with ID: ${result.insertedId}`;
    }

    @Mutation(() => String)
    async updateGame(@Arg('inputs') inputs: GameUpdateInput) {
        let game;
        const { _id, ...updateObject } = inputs;
        const id = new ObjectId(_id);
        try {
            if (inputs.patientId) {
                const game = await this.getGame(_id);
                const oldPatient = await this.patientResolver.getPatient(game?.patientId);
                if (oldPatient) {
                    // @ts-ignore
                    await this.patientResolver.updatePatient({
                        _id: oldPatient._id,
                        games: oldPatient.games.filter((id: string) => id !== _id)
                    });
                }
            }

            game = await this.db.collection('Games').findOneAndUpdate({ _id: id }, { $set: updateObject });

            if (inputs.patientId) {
                const newPatientId = inputs.patientId;
                this.patientResolver.getPatient(newPatientId).then((patient) => {
                    if (!patient) throw new Error('No patient found!');
                    //@ts-ignore
                    this.patientResolver.updatePatient({
                        _id: newPatientId,
                        games: patient.games ? patient.games.concat(newPatientId) : [newPatientId]
                    });
                });
            }
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        if (game?.value) {
            return `Update a game successfully with ID: ${game.value._id}`;
        } else throw new Error('Failed to update');
    }

    @Mutation(() => String)
    async deleteGame(@Arg('id') id: string) {
        let game;
        try {
            game = await this.db.collection('Games').findOneAndDelete({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        if (game.value) {
            return `Delete a game successfully with ID: ${game.value._id}`;
        } else throw new Error('Failed to delete');
    }

    @Query(() => [Game])
    async getRandomGame(@Arg('inputs') inputs: GetRandomGameInput) {
        const games = await this.getGamesByPatient(inputs.id);
        if (!games) return 'No game found';
        if (games.length < inputs.count) return 'Not enough game';
        const arr = [];
        for (let i = 0; i < games.length; i++) {
            arr.push(i);
        }

        const { count } = inputs;
        for (let i = 0; i < count; i++) {
            const rand = Math.floor(Math.random() * (games.length - 1));
            const tmp: number = arr[i];
            arr[i] = arr[rand];
            arr[rand] = tmp;
        }
        const result = [];
        for (let i = 0; i < count; i++) {
            if (games[arr[i]]) {
                result.push(games[arr[i]]);
            }
        }
        return result;
    }
}

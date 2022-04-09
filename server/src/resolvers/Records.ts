import { Db } from 'mongodb';
import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql';
import Container, { Service } from 'typedi';
import { logger } from '../config/logger';
import { Base } from './Base';

@ObjectType()
export class Recording extends Base {
  @Field()
  receiverId!: string;

  @Field()
  ownerId!: string;

  @Field()
  fileName!: string;
}
@Service()
@Service('Recording')
@Resolver()
export class Recorder {
  private db: Db;
  constructor() {
    this.db = Container.get('db');
  }
  @Query(() => [Recording])
  async getRecordings() {
    let recordings;
    try {
      recordings = this.db.collection('records').find();
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }

    const result = await recordings.toArray();
    return result;
  }
  @Query(() => [Recording])
  async getRecordingDoctor(@Arg('id') id: string) {
    let recordings;
    try {
      recordings = this.db.collection('records').find({ receiverId: id });
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
    const result = await recordings.toArray();
    return result;
  }
}

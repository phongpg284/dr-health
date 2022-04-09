import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType, Resolver } from 'type-graphql';

@ObjectType()
export class BaseCreateInput {
  @Field(() => Date)
  createdAt = new ObjectId().getTimestamp();

  @Field(() => Date)
  updatedAt = new ObjectId().getTimestamp();
}

@ObjectType()
export class BaseUpdateInput {
  @Field(() => Date)
  updatedAt = new ObjectId().getTimestamp();
}

@ObjectType()
export class Base {
  @Field(() => ID)
  _id!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

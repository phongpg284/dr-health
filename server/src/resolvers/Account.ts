import { Db } from 'mongodb';
import {
  Arg,
  Field,
  ID,
  InputType,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';
import Container, { Service } from 'typedi';
import { logger } from '../config/logger';
import { BaseCreateInput } from './Base';
import { Doctors } from './Doctors';
import { Patients } from './Patients';

@InputType()
class AccountCreateInput extends BaseCreateInput {
  @Field()
  fullName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  role!: string;

  @Field()
  age!: number;

  @Field()
  phone!: string;

  @Field({ nullable: true })
  education?: string;
}

@InputType()
class AccountGetInput {
  @Field()
  id!: string;

  @Field()
  role!: string;
}

@InputType()
class AccountUpdateInput {
  @Field()
  _id!: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => ID, { nullable: true })
  notificationId?: string;
}

@InputType()
class AccountLoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  role!: string;
}

@ObjectType()
class AccountLoginResponse {
  @Field()
  message!: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  email?: string;
}

@ObjectType()
class Account {
  @Field(() => ID)
  _id!: string;

  @Field()
  fullName!: string;

  @Field()
  role!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  age!: number;

  @Field({ nullable: true })
  education?: string;

  @Field(() => [ID], { nullable: true })
  notificationId?: string[];

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  pathologicalDescription?: string;

  @Field({ nullable: true })
  doctorId?: string;

  @Field(() => [String], { nullable: true })
  patientId?: string[];

  @Field({ nullable: true })
  deviceId?: string;
}
@Service()
@Service('Accounts')
@Resolver()
@Service("Accounts")
export class Accounts {
  private readonly db: Db;
  private readonly doctorResolver: Doctors;
  private readonly patientResolver: Patients;
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.db = Container.get('db');
    this.doctorResolver = Container.get('Doctors');
    this.patientResolver = Container.get('Patients');
  }
  @Query(() => AccountLoginResponse)
  async login(@Arg('inputs') inputs: AccountLoginInput) {
    try {
      if (inputs.role == 'patient') {
        return await this.patientResolver.loginPatient(inputs);
      }
      if (inputs.role == 'doctor') {
        return await this.doctorResolver.loginDoctor(inputs);
      } else return { message: 'Invalid role' };
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }
  //Tạm thời bỏ
  //   @Query(() => [Account])
  //   async getAccounts(@Arg('role') role: string) {
  //     let accounts;
  //     try {
  //       if (role == 'doctor') accounts = await this.doctorResolver.getDoctors();
  //       if (role == 'patient')
  //         accounts = await this.patientResolver.getPatients();
  //       else return { message: 'Invalid Role' };
  //     } catch (error) {
  //       logger.error(error);
  //       throw new Error(error);
  //     }
  //     return accounts;
  //   }

  //   @Query(() => Account)
  //   async getAccount(@Arg('inputs') inputs: AccountGetInput) {
  //     let account;
  //     try {
  //       if (inputs.role === 'patient') {
  //         account = await this.patientResolver.getPatient(inputs.id);
  //         return account;
  //       }
  //       if (inputs.role === 'doctor') {
  //         account = await this.doctorResolver.getDoctor(inputs.id);
  //         return account;
  //       } else return { message: 'Invalid Role' };
  //     } catch (error) {
  //       logger.error(error);
  //       throw new Error(error);
  //     }
  //   }

  //   @Mutation(() => String)
  //   async createAccount(@Arg('inputs') inputs: AccountCreateInput) {
  //     let result;
  //     try {
  //       if (inputs.role === 'patient') {
  //         result = await this.patientResolver.createPatient(inputs);
  //         return result;
  //       }
  //       if (inputs.role === 'doctor') {
  //         result = await this.doctorResolver.createDoctor(inputs);
  //         return result;
  //       } else return { message: 'Invalid Role' };
  //     } catch (error) {
  //       logger.error(error);
  //       throw new Error(error);
  //     }
  //   }

  //   @Mutation(() => String)
  //   async updateAccount(@Arg('inputs') inputs: AccountUpdateInput) {
  //     let account;
  //     const id = new ObjectId(inputs._id);
  //     try {
  //       const { notificationId, _id, ...updateInputs } = inputs;
  //       // if(inputs.notificationId)
  //       account = await this.db.collection('Accounts').findOneAndUpdate(
  //         { _id: id },
  //         // @ts-ignore
  //         { $push: { notificationId: notificationId }, $set: updateInputs }
  //       );
  //     } catch (error) {
  //       logger.error(error);
  //       throw new Error(error);
  //     }
  //     return `Update profile successfully with ID: ${account.value?._id}`;
  //   }

  //   @Query(() => [Notification])
  //   async getUsetNotifications(@Arg('id') id: string) {
  //     let account;
  //     let notifications;
  //     try {
  //       account = await this.db.collection('Accounts').findOne({ _id: id });
  //     } catch (error) {
  //       logger.error(error);
  //       throw new Error(error);
  //     }
  //     if (account) {
  //       try {
  //         notifications = this.db
  //           .collection('Notifications')
  //           .find({ _id: { $in: account.notificationId } });
  //       } catch (error) {
  //         logger.error(error);
  //         throw new Error(error);
  //       }
  //     }
  //     return notifications;
  //   }
}

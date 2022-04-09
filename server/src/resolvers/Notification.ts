import { Db, Document, ModifyResult, ObjectId } from 'mongodb';
import { Arg, Field, ID, InputType, Mutation, ObjectType, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from 'type-graphql';
import Container, { Service } from 'typedi';

import { Base, BaseCreateInput, BaseUpdateInput } from './Base';
import { Accounts } from './Account';
import { Doctors } from './Doctors';
import { Patients } from './Patients';

import { logger } from '../config/logger';

@InputType()
class NotificationCreateInput extends BaseCreateInput {
    @Field()
    title!: string;

    @Field()
    content!: string;

    @Field({ nullable: true })
    accountId?: string;

    @Field({ nullable: true })
    role?: string;

    @Field({ nullable: true })
    mapUrl?: string;
}

@InputType()
class NotificationUpdateInput extends BaseUpdateInput {
    @Field()
    _id!: string;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    content?: string;

    @Field({ nullable: true })
    mapUrl?: string;

    @Field({ nullable: true })
    accountId?: string;

    @Field({ nullable: true })
    role?: string;

    @Field({ nullable: true })
    seen?: boolean;
}

@InputType()
class GetAccountNotificationInput {
    @Field()
    id!: string;

    @Field()
    role!: string;
}

@ObjectType()
export class Notification extends Base {
    @Field(() => ID)
    _id!: string;

    @Field()
    title!: string;

    @Field()
    content!: string;

    @Field({ nullable: true })
    mapUrl?: string;

    @Field({ nullable: true })
    accountId?: string;

    @Field({ nullable: true })
    role?: string;

    @Field()
    seen!: boolean;
}

@Resolver()
@Service()
@Service('Notifications')
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

    @Query(() => [Notification])
    async getNotifications() {
        let notifications;
        try {
            notifications = this.db.collection('Notifications').find();
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        const result = await notifications.toArray();
        return result;
    }

    @Query(() => Notification)
    async getNotification(@Arg('id') id: string) {
        let notification;
        try {
            notification = await this.db.collection('Notifications').findOne({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return notification;
    }
    @Query(() => [Notification])
    async getAccountNotifications(@Arg('inputs') inputs: GetAccountNotificationInput) {
        let account;
        try {
            if (inputs.role === 'doctor') account = await this.doctorResolver.getDoctor(inputs.id);
            if (inputs.role === 'patient') account = await this.patientResolver.getPatient(inputs.id);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        if (!account) throw new Error('No account found!');
        const notificationsId = account.notificationId;

        const tasks: Promise<Document | undefined>[] = [];
        notificationsId.forEach((id: string) => {
            tasks.push(this.getNotification(id));
        });

        const notifications = await Promise.all(tasks);
        return notifications;
    }
    @Mutation(() => String)
    async createNotification(@Arg('inputs') inputs: NotificationCreateInput, @PubSub() pubSub: PubSubEngine) {
        let notification;
        try {
            if (inputs.accountId && inputs.role) {
                let account;
                try {
                    if (inputs.role == 'doctor') account = await this.doctorResolver.getDoctor(inputs.accountId);
                    if (inputs.role == 'patient') account = await this.patientResolver.getPatient(inputs.accountId);
                } catch (err) {
                    throw new Error(err);
                }
                if (!account) throw new Error('No account founded!');
                notification = await this.db.collection('Notifications').insertOne({ ...inputs, seen: false });
                let updateData;

                if (!account.notificationId) {
                    updateData = {
                        _id: account._id,
                        notificationId: [notification.insertedId.toHexString()]
                    };
                } else {
                    updateData = {
                        _id: account._id,
                        notificationId: [...account.notificationId, notification.insertedId.toHexString()]
                    };
                }
                if (inputs.role == 'doctor')
                    // @ts-ignore
                    await this.doctorResolver.updateDoctor(updateData);
                if (inputs.role == 'patient')
                    //@ts-ignore
                    await this.patientResolver.updatePatient(updateData);
            }
        } catch (error) {
            logger.error(error);
            // throw new Error(error);
        }
        if (!notification) throw new Error('Error');

        // Publish new notification
        const payload = await this.getNotification(notification.insertedId.toHexString());
        await pubSub.publish('NOTIFICATION', payload);

        return `Create new notification successfully with ID: ${notification.insertedId}`;
    }

    @Subscription({
        topics: 'NOTIFICATION',
        filter: ({ payload, args }) => args.id === payload.accountId
    })
    newNotification(@Root() notificationPayload: Notification, @Arg('id') id: string): Notification {
        return notificationPayload;
    }

    @Mutation(() => String)
    async updateNotification(@Arg('inputs') inputs: NotificationUpdateInput) {
        let notification;
        const { _id, ...updateObject } = inputs;

        try {
            notification = await this.db.collection('Notifications').findOneAndUpdate({ _id: new ObjectId(inputs._id) }, { $set: updateObject });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return `Update notification successfully with ID: ${notification.value?._id}`;
    }

    @Mutation(() => String)
    async deleteNotification(@Arg('id') id: string) {
        let notification: ModifyResult<Notification> | undefined;
        try {
            notification = await this.db.collection<Notification>('Notifications').findOneAndDelete({ _id: new ObjectId(id) });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        if (notification.value) {
            try {
                const { role, accountId, _id } = notification.value;
                if (role === 'doctor') {
                    const doctor = await this.doctorResolver.getDoctor(accountId!);
                    if (doctor) {
                        const updateData = {
                            _id: accountId,
                            notificationId: doctor.notificationId.filter((notificationId: string) => notificationId !== _id.toString())
                        };
                        // @ts-ignore
                        await this.doctorResolver.updateDoctor(updateData);
                    }
                }
                if (role === 'patient') {
                    const patient = await this.patientResolver.getPatient(accountId!);
                    if (patient) {
                        const updateData = {
                            _id: accountId,
                            notificationId: patient.notificationId.filter((notificationId: string) => notificationId !== _id.toString())
                        };
                        // @ts-ignore
                        await this.patientResolver.updatePatient(updateData);
                    }
                }
            } catch (error) {
                throw new Error(error);
            }
        }

        return `Delete noification successfully with ID: ${notification.value?._id}`;
    }

    @Mutation(() => String)
    async seenAllNotification(@Arg('inputs') inputs: GetAccountNotificationInput) {
        let account;
        try {
            if (inputs.role === 'doctor') account = await this.doctorResolver.getDoctor(inputs.id);
            if (inputs.role === 'patient') account = await this.patientResolver.getPatient(inputs.id);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }

        if (!account) throw new Error('No account found!');
        const notificationsId = account.notificationId;

        const tasks: Promise<string | undefined>[] = [];
        notificationsId.forEach((id: string) => {
            tasks.push(
                this.updateNotification({
                    _id: id,
                    seen: true,
                    updatedAt: new Date()
                })
            );
        });

        await Promise.all(tasks);
        return 'Successfully seen all notification';
    }

    @Mutation(() => String)
    async customNotifications() {
        let notifications;
        try {
            notifications = await this.db.collection('Notifications').find({}).toArray();
            notifications.forEach((notification) => {
                this.db
                    .collection('Notifications')
                    .findOneAndUpdate({ _id: new ObjectId(notification._id) }, { $set: { mapUrl: notification.mapUrl.replace('10.03603,105.7816', '10.036478,105.7842005') } });
            });
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
        return `Custom successfully`;
    }
}

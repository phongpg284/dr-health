import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: EntityRepository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Patient)
    private readonly patientRepository: EntityRepository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: EntityRepository<Doctor>,
    private readonly em: EntityManager,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { title, content, type, userId, patientId, doctorId, appoinment } = createNotificationDto;
    try {
      const newNotification = new Notification();
      newNotification.title = title;
      newNotification.content = content;
      newNotification.status = 'unseen';
      newNotification.type = type ?? 'default';
      newNotification.appointment = appoinment;

      let user;
      if (userId) user = await this.userRepository.findOne(userId);
      if (patientId)
        user = (await this.patientRepository.findOne(patientId, { populate: ['account'] })).account;
      if (doctorId)
        user = (await this.doctorRepository.findOne(doctorId, { populate: ['account'] })).account;
      user.notifications.add(newNotification);
      await this.userRepository.persistAndFlush(user);

      return newNotification;
    } catch (error) {
      logger.log(`Error create notification: ${error}`);
      throw new HttpException(
        {
          message: 'Error create notifcation',
          errors: [error],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      return await this.notificationRepository.findAll({ populate: ['appointment'] });
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async findAllByUser(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail(id, {
        populate: ['notifications', 'notifications.appointment'],
      });
      return user.notifications;
    } catch (error) {
      logger.error(error);
      return new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(params: FilterQuery<Notification>) {
    const notification = await this.notificationRepository.findOne(params);
    if (!notification) throw new HttpException('Notification not found', HttpStatus.BAD_REQUEST);
    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationRepository.findOne({ id });

    wrap(notification).assign(updateNotificationDto);
    await this.notificationRepository.persistAndFlush(notification);
  }

  async seenAllNotifications(userId: number) {
    const qb = this.em
      .createQueryBuilder(Notification)
      .update({ status: 'seen' })
      .where({ user_id: userId, status: 'unseen' });
    const res = await qb.execute();
    return res;
  }

  async remove(id: number) {
    return this.notificationRepository.remove({ id });
  }
}

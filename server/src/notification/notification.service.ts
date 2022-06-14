import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: EntityRepository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { title, content, userId } = createNotificationDto;
    try {
      const newNotification = new Notification();
      newNotification.title = title;
      newNotification.content = content;
      newNotification.status = 'unseen';

      const user = await this.userRepository.findOne(userId);
      user.notifications.add(newNotification);
      await this.userRepository.flush();

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
      return await this.notificationRepository.findAll();
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async findAllByUser(id: number) {
    try {
      const user = await this.userRepository.findOne(id, { populate: ['notifications'] });
      return user.notifications;
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<Notification>) {
    const notification = await this.notificationRepository.findOneOrFail(params);
    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationRepository.findOne({ id });

    wrap(notification).assign(updateNotificationDto);
    await this.notificationRepository.persistAndFlush(notification);
  }

  async remove(id: number) {
    return this.notificationRepository.remove({ id });
  }
}

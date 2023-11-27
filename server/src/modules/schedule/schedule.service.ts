import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { combineDateAndTime, getDateRange } from 'src/utils/date';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ICreateScheduleFromMedicinePrescription } from './interfaces/schedule.interface';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: EntityRepository<Schedule>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}
  async create(createScheduleDto: CreateScheduleDto) {
    const { userId, type, time, appointment, medicinePrescription } = createScheduleDto;
    try {
      const user = await this.userRepository.findOne({ id: +userId });
      const schedule = new Schedule(user, type, time, medicinePrescription, appointment);
      await this.scheduleRepository.persistAndFlush(schedule);
      return schedule;
    } catch (error) {
      Logger.log(`Error create schedule: ${error}`);
      throw new HttpException(
        {
          message: 'Error create schedule',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createScheduleFromMedicinePrescription(params: ICreateScheduleFromMedicinePrescription) {
    const { user, medicinePrescription } = params;
    const { time, startDateRange, endDateRange } = medicinePrescription;
    try {
      const dateRangeArr = getDateRange(startDateRange, endDateRange);
      const schedules = [];
      dateRangeArr.forEach((date) => {
        const finalDate = combineDateAndTime(date, time);
        const newSchedule = new Schedule(
          user,
          'medicine_prescription',
          finalDate,
          medicinePrescription,
        );
        schedules.push(newSchedule);
      });
      await this.scheduleRepository.flush();
      return schedules;
    } catch (error) {
      Logger.log(`Error create schedule: ${error}`);
      throw new HttpException(
        {
          message: 'Error create schedule',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllByUser(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail(id, {
        populate: ['schedules.appointment', 'schedules.medicinePrescription'],
      });
      return user.schedules;
    } catch (error) {
      Logger.error(error);
      return new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}

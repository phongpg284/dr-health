import { FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prescription } from 'src/modules/prescription/entities/prescription.entity';
import { ScheduleService } from 'src/modules/schedule/schedule.service';
import { CreateMedicinePrescriptionDto } from './dto/create-medicine-prescription.dto';
import { UpdateMedicinePrescriptionDto } from './dto/update-medicine-prescription.dto';
import { MedicinePrescription } from './entities/medicine-prescription.entity';
import { CreateMedicinePrescriptionList } from './interfaces/medicine-prescription.interface';

@Injectable()
export class MedicinePrescriptionService {
  constructor(
    @InjectRepository(MedicinePrescription)
    private readonly medicinePrescriptionRepository: EntityRepository<MedicinePrescription>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: EntityRepository<Prescription>,
    private readonly scheduleService: ScheduleService,
  ) {}
  async create(createMedicinePrescriptionDto: CreateMedicinePrescriptionDto) {
    try {
      const { medicine, quantity, time, prescription, startDateRange, endDateRange, note } =
        createMedicinePrescriptionDto;
      try {
        const newMedicinePrescription = new MedicinePrescription(
          prescription,
          medicine,
          quantity,
          startDateRange,
          endDateRange,
          time,
          note,
        );
        await this.scheduleService.createScheduleFromMedicinePrescription({
          user: prescription.patient.account,
          medicinePrescription: newMedicinePrescription,
        });
        return newMedicinePrescription;
      } catch (error) {}
    } catch (error) {
      return new Error(error);
    }
  }

  async createMedicinePrescriptionList(inputs: CreateMedicinePrescriptionList) {
    try {
      const medicinePrescriptions = [];
      const { prescription, schedules } = inputs;
      for (const schedule of schedules) {
        const {
          name,
          note,
          quantity,
          scheduleDateRange: [startDateRange, endDateRange],
          scheduleHours,
        } = schedule;

        const createMedicinePrescriptions = async () => {
          for (const hour of scheduleHours) {
            const medicinePrescription = await this.create({
              prescription,
              medicine: name,
              quantity,
              startDateRange: new Date(startDateRange),
              endDateRange: new Date(endDateRange),
              time: new Date(hour),
              note,
            });
            medicinePrescriptions.push(medicinePrescription);
          }
        };
        await createMedicinePrescriptions();
      }
      // await this.medicinePrescriptionRepository.persistAndFlush(medicinePrescriptions);
      return medicinePrescriptions;
    } catch (error) {
      return new Error(error);
    }
  }

  async findAll() {
    try {
      const medicinePrescriptions = await this.medicinePrescriptionRepository.findAll();
      return medicinePrescriptions;
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<MedicinePrescription>) {
    const medicinePrescription = await this.medicinePrescriptionRepository.findOne(params);
    if (!medicinePrescription)
      throw new HttpException('Medicine Prescription not found', HttpStatus.BAD_REQUEST);
    return medicinePrescription;
  }

  async update(id: number, updateMedicinePrescriptionDto: UpdateMedicinePrescriptionDto) {
    const patient = await this.medicinePrescriptionRepository.findOne({ id });
    wrap(patient).assign(updateMedicinePrescriptionDto);
    await this.medicinePrescriptionRepository.persistAndFlush(patient);
  }

  async remove(id: number) {
    return this.medicinePrescriptionRepository.remove({ id });
  }
}

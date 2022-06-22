import { FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prescription } from 'src/prescription/entities/prescription.entity';
import { CreateMedicinePrescriptionDto } from './dto/create-medicine-prescription.dto';
import { UpdateMedicinePrescriptionDto } from './dto/update-medicine-prescription.dto';
import { MedicinePrescription } from './entities/medicine-prescription.entity';

@Injectable()
export class MedicinePrescriptionService {
  constructor(
    @InjectRepository(MedicinePrescription)
    private readonly medicinePrescriptionRepository: EntityRepository<MedicinePrescription>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: EntityRepository<Prescription>,
  ) {}
  async create(createMedicinePrescriptionDto: CreateMedicinePrescriptionDto) {
    try {
      const { medicine, quantity, time, prescriptionId } = createMedicinePrescriptionDto;
      const prescription = await this.prescriptionRepository.findOne({ id: prescriptionId });
      if (!prescription) throw new Error('Medicine Prescription not found');
      return new MedicinePrescription(prescription, medicine, quantity, time);
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
    if (!medicinePrescription) throw new HttpException('Medicine Prescription not found', HttpStatus.BAD_REQUEST);
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

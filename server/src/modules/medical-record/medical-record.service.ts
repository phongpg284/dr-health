import { FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { MedicalRecord } from './entities/medical-record.entity';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordRepository: EntityRepository<MedicalRecord>,
  ) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    try {
      const newMedicalRecord = new MedicalRecord();
      Object.assign(newMedicalRecord, createMedicalRecordDto);

      await this.medicalRecordRepository.persistAndFlush(newMedicalRecord);
      return newMedicalRecord;
    } catch (error) {
      Logger.log(`Error create medical record: ${error}`);
      throw new HttpException(
        {
          message: 'Error create medical record',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const medicalRecords = await this.medicalRecordRepository.findAll();
      return medicalRecords;
    } catch (error) {
      Logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<MedicalRecord>) {
    const medicalRecord = await this.medicalRecordRepository.findOneOrFail(params);
    return medicalRecord;
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const medicalRecord = await this.medicalRecordRepository.findOne({ id });
    wrap(medicalRecord).assign({
      ...updateMedicalRecordDto,
    });
    await this.medicalRecordRepository.persistAndFlush(medicalRecord);
  }

  async remove(id: number) {
    return this.medicalRecordRepository.remove({ id });
  }
}

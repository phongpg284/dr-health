import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Patient } from './entities/patient.entity';
import { EntityRepository, FilterQuery, QueryOrder, wrap } from '@mikro-orm/core';
import { User } from 'src/user/entities/user.entity';
import { Device } from 'src/device/entities/device.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { GetMedicalStatQuery } from 'src/medical-stat/dto/get-medical-stat.dto';
import { MedicalStat } from 'src/medical-stat/entities/medical-stat.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: EntityRepository<Patient>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: EntityRepository<Doctor>,
    @InjectRepository(Device)
    private readonly deviceRepository: EntityRepository<Device>,
    @InjectRepository(MedicalStat)
    private readonly medicalStatRepository: EntityRepository<MedicalStat>,
    private readonly em: EntityManager,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { accountId, doctorId } = createPatientDto;
    try {
      const newPatient = new Patient();
      newPatient.account = await this.userRepository.findOne({ id: accountId });

      if (doctorId) newPatient.doctor = await this.doctorRepository.findOne({ id: doctorId });

      await this.patientRepository.persistAndFlush(newPatient);
      return newPatient;
    } catch (error) {
      Logger.log(`Error create patient: ${error}`);
      throw new HttpException(
        {
          message: 'Error create patient',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const patients = await this.patientRepository.findAll();
      return patients;
    } catch (error) {
      Logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<Patient>) {
    const patient = await this.patientRepository.findOneOrFail(params);
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientRepository.findOne({ id });
    const { accountId, doctorId } = updatePatientDto;
    wrap(patient).assign({
      account: accountId,
      doctor: doctorId,
    });
    await this.patientRepository.persistAndFlush(patient);
  }

  async remove(id: number) {
    return this.patientRepository.remove({ id });
  }

  async addDevice(deviceId: number, id: number) {
    try {
      const patient = await this.patientRepository.findOne({ id });
      const device = await this.deviceRepository.findOne({ id: deviceId });
      patient.device = device;
      await this.patientRepository.flush();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error add patient to doctor',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getStats(id: number, query: GetMedicalStatQuery) {
    console.log(id, query);
    try {
      const { startDate, endDate, filterStats, lowThreshold, highThreshold } = query ?? {};
      const qb = this.em.createQueryBuilder(MedicalStat).where({ patient_id: id });
      if (startDate) qb.andWhere('created_at >= ?', [startDate]);
      if (endDate) qb.andWhere('created_at <= ?', [endDate]);
      if (lowThreshold) qb.andWhere('value >= ?', [lowThreshold]);
      if (highThreshold) qb.andWhere('value <= ?', [highThreshold]);
      qb.orderBy({ createdAt: QueryOrder.ASC });
      if (filterStats) qb.select(filterStats);
      else qb.select('*');

      const res = await qb.execute();
      return res;
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          message: 'Error get medical stats',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

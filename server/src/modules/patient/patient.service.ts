import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Patient } from './entities/patient.entity';
import { EntityRepository, FilterQuery, QueryOrder, wrap } from '@mikro-orm/core';
import { User } from 'src/modules/user/entities/user.entity';
import { Device } from 'src/modules/device/entities/device.entity';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { GetMedicalStatQuery } from 'src/modules/medical-stat/dto/get-medical-stat.dto';
import { MedicalStat } from 'src/modules/medical-stat/entities/medical-stat.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { DeviceRecord } from '../device-record/device-record.entity';

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
    @InjectRepository(DeviceRecord)
    private readonly deviceRecordRepository: EntityRepository<DeviceRecord>,
    private readonly em: EntityManager,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { accountId, doctorId } = createPatientDto;
    try {
      const account = await this.userRepository.findOneOrFail({ id: accountId });
      const newPatient = new Patient(account);
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
      const patients = await this.patientRepository.findAll({
        populate: ['account', 'doctor'],
      });
      return patients;
    } catch (error) {
      Logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<Patient>) {
    const patient = await this.patientRepository.findOne(params, {
      populate: ['deviceRecords', 'account', 'doctor'],
    });
    if (!patient) throw new HttpException('Patient not found', HttpStatus.BAD_REQUEST);
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

  async addDevice(deviceId: string, id: number) {
    try {
      const patient = await this.patientRepository.findOne({ id });
      const device = await this.deviceRepository.findOne({ code: deviceId });
      if (!patient || !device)
        return {
          message: 'Kết nối thiết bị thất bại!',
          status: 'Fail',
        };

      patient.device = device;
      await this.patientRepository.persistAndFlush(patient);
      return {
        message: 'Kết nối thiết bị thành công!',
        status: 'Success',
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          message: 'Error add device',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeDevice(deviceId: number) {
    try {
      const patient = await this.patientRepository.findOne({ device: deviceId });
      if (!patient) {
        Logger.log('Device already not connect to patients');
        throw new Error('Device already not connect to patients');
      }
      patient.device = null;
      await this.patientRepository.flush();
    } catch (error) {
      return new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getStats(id: number, query: GetMedicalStatQuery) {
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

      const data: any[] = await qb.execute();
      const res = data.reduce((prev, current) => {
        const { patient, type, ...currentStat } = current;
        return {
          ...prev,
          [type]: prev[type] ? [...prev[type], currentStat] : [currentStat],
        };
      }, {});
      return res;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error get medical stats',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPrescriptions(id: number) {
    try {
      const patient = await this.patientRepository.findOneOrFail(id, {
        populate: ['prescriptions'],
      });
      return patient.prescriptions;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error get prescriptions',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getDeviceRecords(id: number) {
    try {
      console.log('iddddd', id);
      return this.deviceRecordRepository.find({
        patient: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error get device records',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

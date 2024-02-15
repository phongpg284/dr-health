import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: EntityRepository<Doctor>,
    @InjectRepository(Patient)
    private readonly patientRepository: EntityRepository<Patient>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    const { accountId } = createDoctorDto;
    try {
      const account = await this.userRepository.findOneOrFail({ id: accountId });
      const newDoctor = new Doctor(account);

      await this.doctorRepository.persistAndFlush(newDoctor);
      return newDoctor;
    } catch (error) {
      logger.log(`Error create account: ${error}`);
      throw new HttpException(
        {
          message: 'Error create doctor',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const doctors = await this.doctorRepository.findAll({ populate: ['account'] });
      return doctors;
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<Doctor>) {
    const doctor = await this.doctorRepository.findOneOrFail(params, { populate: ['account'] });
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.doctorRepository.findOne({ id });
    const { accountId } = updateDoctorDto;
    wrap(doctor).assign({
      account: accountId,
    });
    await this.doctorRepository.persistAndFlush(doctor);
  }

  async remove(id: number) {
    return this.doctorRepository.remove({ id });
  }

  async addPatient(id: number, patientCode: string) {
    try {
      const doctor = await this.doctorRepository.findOne({ id });
      const patient = await this.patientRepository.findOne({ code: patientCode });
      doctor.patients.add(patient);
      await this.doctorRepository.flush();
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

  async getPatients(id: number) {
    const doctor = await this.doctorRepository.findOneOrFail({ account: id });
    const res = await this.patientRepository.find(
      { doctor: doctor.id },
      { populate: ['account.address'] },
    );

    return res.reverse().map((patient) => {
      return {
        ...patient.account,
        code: patient?.code,
      };
    });
  }
}

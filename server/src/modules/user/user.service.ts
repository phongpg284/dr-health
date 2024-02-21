import * as argon2 from 'argon2';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { Role } from 'src/constant/enums';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Patient)
    private readonly patientRepository: EntityRepository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: EntityRepository<Doctor>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirmPassword, email, fullName, role } = createUserDto;
    if (password !== confirmPassword)
      throw new HttpException('Error: password unmatched!', HttpStatus.BAD_REQUEST);
    let hashPassword: string;

    const user = await this.userRepository.findOne({ email });
    if (user)
      throw new HttpException(
        {
          message: 'Error: User already exist!',
        },
        HttpStatus.BAD_REQUEST,
      );

    try {
      hashPassword = await argon2.hash(password);
      const newUser = new User();
      newUser.email = email;
      newUser.fullName = fullName;
      newUser.role = role;
      newUser.password = hashPassword;

      switch (role) {
        case Role.PATIENT:
          const newPatient = new Patient(newUser);
          await this.patientRepository.persistAndFlush(newPatient);
          break;
        case Role.DOCTOR:
          const newDoctor = new Doctor(newUser);
          await this.doctorRepository.persistAndFlush(newDoctor);
          break;
        default:
          break;
      }

      await this.userRepository.persistAndFlush(newUser);
      return newUser;
    } catch (error) {
      logger.log(`Error create account: ${error}`);
      throw new HttpException(
        {
          message: 'Error create account',
          errors: [error],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      return await this.userRepository.findAll({ populate: ['doctor', 'patient'] });
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<User>) {
    const user = await this.userRepository.findOneOrFail(params, {
      populate: ['address', 'doctor', 'patient'],
    });
    if (user.role === 'patient') {
      const patient = await this.patientRepository.findOneOrFail({ account: user.id });
      console.log('patientId', patient.id);
      return {
        ...user,
        code: patient?.code,
        patientId: patient?.id,
      };
    }
    return user;
  }

  async getRoleData(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail(id, { fields: ['role'] });
      if (user.role === 'patient') {
        return await this.patientRepository.findOneOrFail({ account: user.id });
      }
      if (user.role === 'doctor') {
        return await this.doctorRepository.findOneOrFail({ account: user.id });
      }
    } catch (error) {
      return new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getNotifications(id: number) {
    const user = await this.userRepository.findOneOrFail(id, { populate: ['notifications'] });
    return user.notifications;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user?.role === 'patient') {
      const patient = await this.patientRepository.findOne({ account: user.id });
      return { user: user, roleId: patient.id };
    } else if (user?.role === 'doctor') {
      const doctor = await this.doctorRepository.findOne({ account: user.id });
      return { user: user, roleId: doctor.id };
    }
    return { user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ id });
    wrap(user).assign(updateUserDto);
    await this.userRepository.persistAndFlush(user);
  }

  async remove(id: number) {
    return this.userRepository.remove({ id });
  }
}

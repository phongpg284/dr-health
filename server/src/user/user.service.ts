import * as argon2 from 'argon2';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Patient)
    private readonly patientRepository: EntityRepository<Patient>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, rePassword, email, firstName, lastName, role } = createUserDto;
    if (password !== rePassword) throw new HttpException('Error: password unmatched!', HttpStatus.BAD_REQUEST);
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
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.role = role;
      newUser.password = hashPassword;

      if (role === 'patient') {
        const newPatient = new Patient();
        newPatient.account = newUser;
        console.log(newPatient);
        await this.patientRepository.persistAndFlush(newPatient);
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
      return await this.userRepository.findAll();
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<User>) {
    const user = await this.userRepository.findOneOrFail(params, { fields: ['id', 'email', 'role', 'password'] });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
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

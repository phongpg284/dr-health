import { FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';
import { Patient } from 'src/patient/entities/patient.entity';
import { CreateMedicalStatDto } from './dto/create-medical-Stat.dto';
import { UpdateMedicalStatDto } from './dto/update-medical-Stat.dto';
import { MedicalStat } from './entities/medical-stat.entity';

@Injectable()
export class MedicalStatService {
  constructor(
    @InjectRepository(MedicalStat)
    private readonly medicalStatRepository: EntityRepository<MedicalStat>,
    @InjectRepository(Patient)
    private readonly patientRepository: EntityRepository<Patient>,
  ) {}

  async create(createMedicalStatDto: CreateMedicalStatDto) {
    const { patientId, type, unit, value } = createMedicalStatDto;
    try {
      const newMedicalStat = new MedicalStat();
      newMedicalStat.type = type;
      newMedicalStat.unit = unit;
      newMedicalStat.value = +value;
      const patient = await this.patientRepository.findOne(+patientId);
      patient.medicalRecords.add(newMedicalStat);

      await this.patientRepository.flush();
      return newMedicalStat;
    } catch (error) {
      Logger.log(`Error create medical stat: ${error}`);
    }
  }

  async findAll() {
    try {
      const medicalStats = await this.medicalStatRepository.findAll();
      return medicalStats;
    } catch (error) {
      Logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<MedicalStat>) {
    const medicalStat = await this.medicalStatRepository.findOneOrFail(params);
    return medicalStat;
  }

  async update(id: number, updateMedicalStatDto: UpdateMedicalStatDto) {
    const medicalStat = await this.medicalStatRepository.findOne({ id });
    const { patientId } = updateMedicalStatDto;
    wrap(medicalStat).assign({
      patient: patientId,
    });
    await this.medicalStatRepository.persistAndFlush(medicalStat);
  }

  async remove(id: number) {
    return this.medicalStatRepository.remove({ id });
  }
}

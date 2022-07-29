import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateMedicalThresholdDto } from './dto/create-medical-threshold.dto';
import { UpdateMedicalThresholdDto } from './dto/update-medical-threshold.dto';
import { MedicalThreshold } from './entities/medical-threshold.entity';

@Injectable()
export class MedicalThresholdService {
  constructor(
    @InjectRepository(MedicalThreshold)
    private readonly medicalThresholdRepository: EntityRepository<MedicalThreshold>,
  ) {}
  create(createMedicalThresholdDto: CreateMedicalThresholdDto) {
    return 'This action adds a new medicalThreshold';
  }

  findAll() {
    return `This action returns all medicalThreshold`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalThreshold`;
  }

  update(id: number, updateMedicalThresholdDto: UpdateMedicalThresholdDto) {
    return `This action updates a #${id} medicalThreshold`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalThreshold`;
  }

  getThresholdForPatient = async (patientId) => {
    return await this.medicalThresholdRepository.findOne({ patient: patientId });
  };
}

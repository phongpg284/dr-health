import { Injectable } from '@nestjs/common';
import { CreateMedicalStatDto } from './dto/create-medical-stat.dto';
import { UpdateMedicalStatDto } from './dto/update-medical-stat.dto';

@Injectable()
export class MedicalStatService {
  create(createMedicalStatDto: CreateMedicalStatDto) {
    return 'This action adds a new medicalStat';
  }

  findAll() {
    return `This action returns all medicalStat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalStat`;
  }

  update(id: number, updateMedicalStatDto: UpdateMedicalStatDto) {
    return `This action updates a #${id} medicalStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalStat`;
  }
}

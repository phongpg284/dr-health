import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: EntityRepository<Medicine>,
  ) {}

  async create(createMedicineDto: CreateMedicineDto) {
    try {
      const { name } = createMedicineDto;
      const medicine = new Medicine(name);
      await this.medicineRepository.persistAndFlush(medicine);
      return medicine;
    } catch (error) {
      return new Error(error);
    }
  }

  async findAll() {
    try {
      const medicines = await this.medicineRepository.findAll();
      return medicines;
    } catch (error) {
      Logger.error(error);
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} medicine`;
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto) {
    return `This action updates a #${id} medicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicine`;
  }
}

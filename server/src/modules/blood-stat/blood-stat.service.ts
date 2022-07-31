import { Injectable } from '@nestjs/common';
import { CreateBloodStatDto } from './dto/create-blood-stat.dto';
import { UpdateBloodStatDto } from './dto/update-blood-stat.dto';

@Injectable()
export class BloodStatService {
  create(createBloodStatDto: CreateBloodStatDto) {
    return 'This action adds a new bloodStat';
  }

  findAll() {
    return `This action returns all bloodStat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bloodStat`;
  }

  update(id: number, updateBloodStatDto: UpdateBloodStatDto) {
    return `This action updates a #${id} bloodStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} bloodStat`;
  }
}

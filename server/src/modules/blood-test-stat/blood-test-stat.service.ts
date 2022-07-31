import { Injectable } from '@nestjs/common';
import { CreateBloodTestStatDto } from './dto/create-blood-test-stat.dto';
import { UpdateBloodTestStatDto } from './dto/update-blood-test-stat.dto';

@Injectable()
export class BloodTestStatService {
  create(createBloodTestStatDto: CreateBloodTestStatDto) {
    return 'This action adds a new bloodTestStat';
  }

  findAll() {
    return `This action returns all bloodTestStat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bloodTestStat`;
  }

  update(id: number, updateBloodTestStatDto: UpdateBloodTestStatDto) {
    return `This action updates a #${id} bloodTestStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} bloodTestStat`;
  }
}

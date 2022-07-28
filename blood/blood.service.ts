import { Injectable } from '@nestjs/common';
import { CreateBloodDto } from './dto/create-blood.dto';
import { UpdateBloodDto } from './dto/update-blood.dto';

@Injectable()
export class BloodService {
  create(createBloodDto: CreateBloodDto) {
    return 'This action adds a new blood';
  }

  findAll() {
    return `This action returns all blood`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blood`;
  }

  update(id: number, updateBloodDto: UpdateBloodDto) {
    return `This action updates a #${id} blood`;
  }

  remove(id: number) {
    return `This action removes a #${id} blood`;
  }
}
